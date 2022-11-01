const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')

const stripeController = async (req, res) => {
    try {
        console.log(req.body)
        const { items, email } = req.body

        const calculateOrderAmount = (items) => {
            return 1400
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            receipt_email: email,
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