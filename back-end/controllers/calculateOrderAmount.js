const Product = require('../models/Products')
const { getPriceAndReceipt } = require('./stripeController')

const recieptDescription = (cart) => {
    let receipt = ''
    cart.map(item => (
        receipt += `${item.onOrder} x ${item.name}\n `
    ))
    return receipt.trim()
}

// for each item in the cart; use the db price for that item
// instead of relying on the price from the front-end
const calculateOrderAmount = async (req, res) => {
    const { cart } = req.body
    let subtotal = 0
    const tax = 1.0925
    
    const receipt = recieptDescription(cart)

    await cart.map(async item => {
        const product = await Product.findOne(
            { _id: item._id }, 'price inventory'
        )
        subtotal += Number(product.price * item.onOrder * 100)
        let total = Math.round(subtotal * tax)
        getPriceAndReceipt(total, receipt)
    })

    res.status(200).json({ "Cart total:": subtotal })
}

module.exports = calculateOrderAmount