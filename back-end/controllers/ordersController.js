const Orders = require('../models/Orders')
const Product = require('../models/Products')
let globalCart
let globalCustomer
let clientSecret

const setCustomerOrder = (cart, customer, clientSecret) => {
    const abbvCart = cart.map(item => (
        {
            id: item._id,
            name: item.name,
            numPurchased: item.onOrder,
            price: item.price,
            inventory: item.inventory
        }
    ))
    globalCart = abbvCart
    globalCustomer = customer
    clientSecret = clientSecret
}

const createOrder = async () => {
    await Orders.create({
        customerInfo: globalCustomer,
        itemsBought: globalCart,
        paymentId: clientSecret
    })
}

const updateInventory = () => {
    globalCart.forEach(async (item) => {
        const newInventory = item.inventory - item.numPurchased

        const product = await Product.findOne({ _id: item.id })

        if (!product) throw new Error("There ain't no product")

        product.inventory = newInventory
        product.successfulPurchase = true

        await product.save()
    })
}

// stripe listen --forward-to localhost:5000/api/v1/orders/hook
const updateInventoryStripeHook = async (req, res) => {
    let event = req.body

    switch (event.type) {
        case 'payment_intent.created':
            console.log('payment intent created')
            break

        case 'payment_intent.succeeded':
            console.log('payment intent succeded')
            console.log('da set cart: ', globalCart)
            break

        case 'charge.succeeded':
            createOrder()
            updateInventory()
            res.status(200).json({ msg: `Inventory & Orders updated` })
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
    setCustomerOrder,
    createOrder,
    updateInventoryStripeHook,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
}