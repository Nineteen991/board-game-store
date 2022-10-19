import express from 'express'
import {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} from '../controllers/productController.js'

const router = express.Router()

router.route('/')
    .get(getAllProducts)
    .post(createProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

router.route('/uploads')
    .post(uploadImage)

export default router