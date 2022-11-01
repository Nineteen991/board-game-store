const mongoose = require('mongoose')

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
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    detailed_desc: {
        details: [{
            type: String,
            required: [true, 'Need a more detailed product description'],
            maxlength: [1000, 'Detailed description cannot be more than 1000 characters']
        }]
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
    primary_images: {
        images: [{
            type: String,
            required: [true, 'Need image box images'],
            default: '/uploads/ancient-stone-spheres.webp'
        }]
    },
    secondary_images: {
        images: [{
            url: String,
            text: String,
            css_property: String
        }]
    },
    inventory: {
        type: Number,
        required: [true, 'How many are in stock?'],
        default: 0
    },
    
}, { timestamps: true })
module.exports = mongoose.model('Product', ProductSchema)