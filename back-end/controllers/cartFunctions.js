// const Product = require('../models/Products')

// for each item in the cart; use the db price for that item
// instead of relying on the price from the front-end
// const productPrice = async (item) => {
//     const product = await Product.findOne({ _id: item._id })
//     // the total amount sent to stripe must be in cents
//     return Number(product.price * item.onOrder * 100)
// }

const calculateOrderAmount = async (cart) => {
    // const totalArr = await cart.forEach(async item => {
    //   // const product = await Product.findOne({ _id: item._id })
      
    //   // the total amount sent to stripe must be in cents
    //   return Number(product.price * item.onOrder * 100)

    //   // console.log(await productPrice(item))
    //   //   return await productPrice(item)
    // })
    console.log(cart)
    return await cart.reduce((x, y) => x + y)
    // console.log('da total: ', total)
    // return Number(total)
}

const recieptDescription = (cart) => {
    let receipt = ''
    cart.map(item => (
        receipt += `${item.onOrder} x ${item.name}\n `
    ))
    return receipt.trim()
}

module.exports = { calculateOrderAmount, recieptDescription }