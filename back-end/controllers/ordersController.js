const Orders = require('../models/Orders')
const Product = require('../models/Products')
const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')
const endpointSecret = 'acct_1GkCtsFnmrgYLyE1'
let globalCart

const createOrder = async (req, res) => {
    const { cart, customer, clientSecret } = await req.body

    globalCart = cart

    const order = await Orders.create({
        customerInfo: customer,
        itemsBought: cart,
        paymentId: await clientSecret
    })

    if (!order) throw new Error("We ain't got an order yet :( ")

    res.status(200).json({ order })
}

const updateOrder = async (req, res) => {
    console.log(`updateOrder: ${req.body}`)
    const sig = req.headers['stipe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
        console.log(`da event: ${event}`)
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }

    // handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            console.log('orders cont payment intent succeded')
            globalCart.forEach(async (item) => {
                const prevInventory = await Product.findOne({ _id: item.id })
                const newInventory = prevInventory.inventory - item.count
        
                // update the db inventory for those cart items sold
                const product = await Product.findOneAndUpdate(
                    { _id: item.id },
                    { inventory: newInventory },
                    { new:true, runValidators: true}
                )
        
                if (!product) {
                    throw new Error(
                        `No product inventory to update: ${ item.id }`
                    )
                }
                console.log(`probably updated the ${item.id} inventory`)
            })
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    
    // return a 200 res to acknowledge receipt of the event
    res.status(200).json({ msg: `Inventory updated`})
}

const getOrders = async (req, res) => {
    const orders = await Orders.find({})

    res.status(200).json({ orders })
}

const getSingleOrder = async (req, res) => {
    const { id } = req.params
    const order = await Orders.findOne({ _id: id })

    if (!order) throw new Error(`Ain't no orders with id: ${ id }`)

    res.status(200).json({ order })
}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    const order = await Orders.findOne({ _id: id })

    if (!order) throw new Error(`There's no order with id: ${ id }`)

    await order.remove()
        .catch(err => {
            res.status(500).json({ msg: `${err}` })
        })

    res.status(200).json({ msg: `${order} deleted`})
}

module.exports = {
    createOrder,
    getOrders,
    getSingleOrder,
    deleteOrder,
    updateOrder
}