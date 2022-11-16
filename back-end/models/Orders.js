const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customerInfo: {
        type: String,
        trim: true,
        required: true
    },
    itemsBought: {
        type: Array,
        required: true
    },
    successfulPurchase: {
        type: Boolean,
        default: false
    },
    inStorePickup: {
        type: Boolean,
        default: false,
        required: true
    },
    shipped: {
        type: Boolean,
        default: false
    },
    paymentId: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Orders', OrderSchema)