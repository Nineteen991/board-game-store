import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Need product name'],
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Need product description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Need price'],
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Need product image'],
        default: '/uploads/ancient-stone-spheres.webp'
    },
    inventory: {
        type: Number,
        required: [true, 'How many are in stock?'],
        default: 0
    },
    
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema)