const express = require('express')
const router = express.Router()

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController')

router.route('/')
    .get(getAllProducts)
    .post(createProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

router.route('/uploads')
    .post(uploadImage)

module.exports = router