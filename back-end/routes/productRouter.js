import express from 'express'
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

router.route('/')
    .get(getAllProducts)
    .post(createProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

export default router