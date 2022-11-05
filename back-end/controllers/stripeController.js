const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')

const stripeController = async (req, res) => {
    try {
        const { cart, customer } = req.body
        console.log(customer)
        const calculateOrderAmount = (cart) => {
            const totalArr = cart.map(item => (
                item.price * item.onOrder * 100
            ))
            // add each price together from the array
            const total = totalArr.reduce((x,y) => x + y)
            return total
        }
 
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(cart),
            currency: "usd",
            // customer: { name: customer.name },
            receipt_email: customer.email,
            automatic_payment_methods: {
                enabled: true,
            },
        })

        if (!paymentIntent) throw new Error('unsuccessful charge')
        console.log(paymentIntent)
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