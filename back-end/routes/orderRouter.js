const express = require('express')
const router = express.Router()

const {
    createOrder,
    getOrders,
    getSingleOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/ordersController')

router.route('/')
    .get(getOrders)
    .post(createOrder)

router.route('/:id')
    .get(getSingleOrder)
    .patch(updateOrder)
    .delete(deleteOrder)

module.exports = router