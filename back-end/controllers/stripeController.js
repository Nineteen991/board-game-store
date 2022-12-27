require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_TEST_SK)
const Product = require('../models/Products')

const {  recieptDescription } = require('./cartFunctions')
const { setCustomerOrder } = require('./ordersController')

const stripeController = async (req, res) => {
    const { cart, customer } = req.body
    
    // const calculateOrderAmount = async (cart) => {
    //     const totalArr = cart.map(async item => {
    //         const product = await Product.findOne({ _id: item._id })
    //         return Number(product.price * item.onOrder * 100)
    //     })
    //     console.log(await totalArr)
    //     return totalArr.reduce((x, y) => x + y, 0)
    // }
    
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2500,
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