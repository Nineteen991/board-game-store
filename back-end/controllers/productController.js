import path from'path'
import fs from 'fs'
import cloudinary from 'cloudinary'

import Product from '../models/Products.js'

export async function createProduct (req, res) {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
}

export async function getAllProducts (req, res) {
    const products = await Product.find({})
    res.status(200).json({ "Number of products": products.length , products })
}

export async function getSingleProduct (req, res) {
    const { id: productId } = req.params
    const product = await Product.findOne({ _id: productId })

    if (!product) {
        throw new Error(`No product with id: ${ productId }`)
    }

    res.status(200).json({ product })
}

export async function updateProduct (req, res) {
    const { id: productId } = req.params 

    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!product) {
        throw new Error(`No product with id: ${ productId }`)
    }

    res.status(200).json({ product })
}

export async function deleteProduct (req, res) {
    const { id: productId } = req.params
    const product = await Product.findOneAndDelete({ _id: productId })

    if (!product) {
        throw new Error(`No product matches this id: ${ productId }`)
    }

    await product.remove()
        .catch(error => {
            res.status(500).json({ msg: `${ error }` })
        })

    res.status(200).json({ msg: `Product ${ productId } deleted` })
}

export async function uploadImage (req, res) {
    const uploadToCloud = await cloudinary.v2.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'board-game-images'
        }
    )
    console.log(uploadToCloud)

    // remove temp files from our server
    fs.unlinkSync(req.files.image.tempFilePath)

    return res.status(200).json({ image: { src: uploadToCloud.secure_url } })

    // alt version uses streams?
}