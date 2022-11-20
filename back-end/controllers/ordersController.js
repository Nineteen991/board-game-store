const Orders = require('../models/Orders')
const Product = require('../models/Products')
// const stripe = require('stripe')('sk_test_mk88WTaqx8vkziXaS7tMfeFt00q6zuI5a7')
// const endpointSecret = 'acct_1GkCtsFnmrgYLyE1'
let globalCart

const createOrder = async (req, res) => {
    const { cart, customer, clientSecret } = await req.body

    globalCart = cart

    const abbvCart = await cart.map(item => (
        {
            id: item._id,
            name: item.name,
            numPurchased: item.onOrder,
            price: item.price
        }
    ))

    const order = await Orders.create({
        customerInfo: customer,
        itemsBought: await abbvCart,
        paymentId: await clientSecret
    })

    if (!order) throw new Error("We ain't got an order yet :( ")

    res.status(200).json({ order })
}

const updateInventoryStripeHook = async (req, res) => {
    let event = req.body

    // handle the event
    switch (event.type) {
        case 'payment_intent.created':
            console.log('payment intent created')
            break
        case 'payment_intent.succeeded':
            console.log('payment intent succeded')
            break
        case 'charge.succeeded':
            if (!globalCart) throw new Error('No items in cart')

            globalCart.forEach(async (item) => {
                const newInventory = item.inventory - item.onOrder

                // update the db inventory for those cart items sold
                const product = await Product.findOne({ _id: item._id })

                if (!product) throw new Error("There ain't no product")

                product.inventory = newInventory
                product.successfulPurchase = true

                await product.save()
            })
            res.status(200).json({ msg: `Inventory updated` })
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }
}

const getOrders = async (req, res) => {
    const orders = await Orders.find({})

    res.status(200).json({ numOrders: orders.length, orders })
}

const getSingleOrder = async (req, res) => {
    const { id } = req.params
    const order = await Orders.findOne({ _id: id })

    if (!order) throw new Error(`Ain't no orders with id: ${ id }`)

    res.status(200).json({ order })
}

const updateOrder = async (req, res) => {
    const { id } = req.params
    const order = await Orders.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true, runValidators: true }
    )

    if (!order) throw new Error('Order not found')

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
    updateInventoryStripeHook,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
}