const express = require('express')
const router = express.Router()

const calculateOrderAmount = require('../controllers/calculateOrderAmount')

router.route('/')
  .post(calculateOrderAmount)

module.exports = router