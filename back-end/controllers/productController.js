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

const uploadImage = async (req, res) => {
    // need express file upload pkg & use express static
    if (!req.files) {
        throw new Error('No files uploaded')
    }

    const productImage = req.files.image

    if (!productImage.mimetype.startsWith('image')) {
        throw new Error('Please upload image')
    }

    // I don't think I want images larger than 5mb
    const maxSize = 1024 * 1024 * 5
    if (productImage.size > maxSize) {
        throw new Error('Please upload image < 5mb')
    }

    const imagePath = path.join(
        __dirname,
        '/public/uploads/' + `${ productImage.name }`
    )

    await productImage.mv(imagePath)

    res.status(200).json({ image: `/uploads/${ productImage.name }` })
}