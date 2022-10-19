import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import * as dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cloudinary from 'cloudinary'

dotenv.config()
const app = express()

// database
import connectDB from './db/connect.js'

// routers
import productRouter from './routes/productRouter.js'

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(express.static('/public'))

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

app.use('/api/v1/products', productRouter)

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