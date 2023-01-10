const express = require('express') 
const cors = require('cors') 
require('express-async-errors')
require('dotenv').config()
const fileUpload = require('express-fileupload') 
const bodyParser = require('body-parser') 
const cloudinary = require('cloudinary') 
const helmet = require('helmet')

const app = express()

// database
const connectDB = require('./db/connect.js')

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(helmet())

app.use(express.static('/public'))

// routers
const productRouter = require('./routes/productRouter')
const stripeRouter = require('./routes/stripeRouter')
const ordersRouter = require('./routes/orderRouter')
const cartRouter = require('./routes/cartRouter')

// file upload
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
app.use(fileUpload({ useTempFiles: true }))

// routes
app.get('/', (req, res) => {
    res.send('Board game store, server probably started')
})

app.use('/api/v1/stripe', stripeRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/cart', cartRouter)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server started on port: ${PORT}`))
    }
    catch (error) {
        console.log(`You broke the server: ${ error }`)
    }
}

start()