const Product = require('../models/Products')

// for each item in the cart; use the db price for that item
// instead of relying on the price from the front-end
const calculateOrderAmount = async (cart) => {
    const total = await cart.map(async item => {
        const product = await Product.findOne({ _id: item._id })
        console.log(product.price)
        return Number(product.price * item.onOrder * 100)
    })
    return total.reduce((x, y) => x + y)
}

const recieptDescription = (cart) => {
    let receipt = ''
    cart.map(item => (
        receipt += `${item.onOrder} x ${item.name}\n `
    ))
    return receipt.trim()
}

module.exports = { calculateOrderAmount, recieptDescription }