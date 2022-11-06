const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')
const Product = require('../models/Products')

const stripeController = async (req, res) => {

    // for each item in the cart; use the db price for that item
    // instead of relying on the price from the front-end
    const productPrice = async (item) => {
        const product = await Product.findOne({ _id: item._id })
        return product.price * item.onOrder * 100
    }

    try {
        const { cart, customer } = req.body
        console.log(customer)
        // the total amount sent to stripe must be in cents
        const calculateOrderAmount = async (cart) => {
            const totalArr = await cart.map(item => {
                return productPrice(item)
            })
            // add each price together from the array
            const total = totalArr.reduce((x,y) => x + y)
            return total
        }
 
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: await calculateOrderAmount(cart),
            currency: "usd",
            // customer: { name: customer.name },
            receipt_email: customer.email,
            automatic_payment_methods: {
                enabled: true,
            },
        })

        if (!paymentIntent) throw new Error('unsuccessful charge')
        console.log(paymentIntent)

        // is successful payment; need to update the db
        if (paymentIntent) {
            cart.forEach(async (item) => {
                const prevInventory = await Product.findOne({ _id: item._id })
                const newInventory = prevInventory.inventory - item.onOrder

                // update the db inventory for those cart items sold
                const product = await Product.findOneAndUpdate(
                    { _id: item._id },
                    { inventory: newInventory },
                    { new:true, runValidators: true}
                )

                if (!product) {
                    throw new Error(
                        `No product inventory to update: ${ item.name }`
                    )
                }
            })
        }

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret, 
            msg:'successful charge' 
        })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = stripeController