const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customerInfo: {
        type: Object,
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
        default: true
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