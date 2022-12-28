require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_TEST_SK)

const { calculateOrderAmount, recieptDescription } = require('./cartFunctions')
const { setCustomerOrder } = require('./ordersController')

const stripeController = async (req, res) => {
    const { cart, customer } = req.body
    
    try {
        const orderTotal = await calculateOrderAmount(cart)
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderTotal,
            currency: "usd",
            description: recieptDescription(cart),
            receipt_email: customer.email,
            payment_method_types: ['card'],
            // automatic_payment_methods: {
            //     enabled: true,
            // },
        })

        if (!paymentIntent) {
            throw new Error('unsuccessful charge')
        } else {
            setCustomerOrder(cart, customer, paymentIntent.client_secret)
        }

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret, 
            msg:'successful charge' 
        })
    }
    catch (error) {
        res.status(400).send({
            error: { message: error.message }
        })
    }
}

module.exports = stripeController