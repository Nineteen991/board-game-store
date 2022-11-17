const Orders = require('../models/Orders')
const Product = require('../models/Products')
// const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')
// const endpointSecret = 'acct_1GkCtsFnmrgYLyE1'
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
    let event = req.body

    // handle the event
    switch (event.type) {
        // case 'payment_intent.created':
        // case 'charge.succeeded':
        case 'payment_intent.succeeded':
            globalCart.forEach(async (item) => {                
                console.log(`da item ${item}`)
                const newInventory = item.inventory - item.onOrder

                // update the db inventory for those cart items sold
                const product = await Product.findOneAndUpdate(
                    { _id: item._id },
                    { inventory: newInventory },
                    { new:true, runValidators: true}
                )
        
                if (!product) {
                    throw new Error(
                        `No product inventory to update: ${ item.id }`
                    )
                }
                // return a 200 res to acknowledge receipt of the event
                res.status(200).json({ msg: `${item.name} Inventory updated`})
            })
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
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