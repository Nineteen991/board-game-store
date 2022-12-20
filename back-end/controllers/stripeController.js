require('dotenv').config()
const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')
const Product = require('../models/Products')

const stripeController = async (req, res) => {
    const { cart, customer } = req.body

    // for each item in the cart; use the db price for that item
    // instead of relying on the price from the front-end
    const productPrice = async (item) => {
        const product = await Product.findOne({ _id: item._id })
        return Number(product.price * item.onOrder * 100)
    }

    // the total amount sent to stripe must be in cents
    const calculateOrderAmount = async (cart) => {
        const totalArr = await cart.map(item => {
            return productPrice(item)
        })
        // add each price together from the array
        return totalArr.reduce((x, y) => x + y, 0)
    }

    // Add a description of the items bought for the receipt
    const recieptDescription = async (cart) => {
        const purchasedItems = await cart.map(item => item.name)
        return `You purchased ${purchasedItems}`
    }

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 23,
            currency: "usd",
            description: await recieptDescription(cart),
            receipt_email: customer.email,
            automatic_payment_methods: {
                enabled: true,
            }
        })
console.log(paymentIntent)
        if (!paymentIntent) throw new Error('unsuccessful charge')

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