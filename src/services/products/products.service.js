import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import '../../config/environment.js'
import databases from '../db/index.js'

// Init
const app = express()
const PORT_PRODUCTS = app.set('port', process.env.PORT_PRODUCTS || 3001).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors({origin: 'localhost'})) // Whitelisting

// Get all
app.get('/service/:db/getProducts', (req, res) => {
  const { db } = req.params
  let products

  products = db === 'sql' 
    ? databases.sql.products.getAll() 
    : databases.mongo.products.getAll()

  res.json([{}])
})

// Create
app.post('/service/:db/createProduct', (req, res) => {
  const { db } = req.params
  const productData = req.body
  let product

  product = db === 'sql' 
    ? databases.sql.products.create(productData) 
    : databases.mongo.products.create(productData)

  res.json([{}])
})

// Run
app.listen(PORT_PRODUCTS, () => {
  console.log(`Products service running on port ${PORT_PRODUCTS}`)
})
