import express from 'express'
import session from 'express-session';
import morgan from 'morgan'
import cors from 'cors'
import '../config/environment.js'
import databases from './db/db.js'
import ProductDTO from '../dto/product.dto.js'
import { isInvalidDB, isInvalidID, isInvalidProduct } from '../utils/validate.utils.js'

// Init
const app = express()
const PORT_PRODUCTS = app.set('port', process.env.PORT_PRODUCTS || 3001).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors({origin: 'localhost'})) // Whitelisting
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  }),
)

// Response
const handleResponse = res => (error, message, data) => {
  return res.json(
    error 
    ? { statusCode: 400, status: 'error', message, data } 
    : { statusCode: 200, status: 'success', message, data }
  )
}

// Get all
app.get('/service/products/:db/getProducts', (req, res) => {
  const { db } = req.params

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  db === 'sql'
    ? databases.sql.products.getAll(handleResponse(res))
    : databases.mongo.products.getAll(handleResponse(res))
})

// Get by ID
app.get('/service/products/:db/getProduct/:id', (req, res) => {
  const { db, id } = req.params

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })

  db === 'sql'
    ? databases.sql.products.getByID(id, handleResponse(res))
    : databases.mongo.products.getByID(id, handleResponse(res))
})

// Create
app.post('/service/products/:db/createProduct', (req, res) => {
  const { db } = req.params
  const productData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  if (isInvalidProduct(productData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })

  const product = new ProductDTO(productData)
  db === 'sql'
    ? databases.sql.products.create(product, handleResponse(res))
    : databases.mongo.products.create(product, handleResponse(res))
})

// Update by ID
app.put('/service/products/:db/updateProduct/:id', (req, res) => {
  const { db, id } = req.params
  const productData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })
  
  if (isInvalidProduct(productData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })

  const product = new ProductDTO(productData)
  db === 'sql'
    ? databases.sql.products.update(id, product, handleResponse(res))
    : databases.mongo.products.update(id, product, handleResponse(res))
})

// Delete by ID
app.delete('/service/products/:db/deleteProduct/:id', (req, res) => {
  const { db, id } = req.params
  
  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })
  
  db === 'sql'
    ? databases.sql.products.delete(id, handleResponse(res))
    : databases.mongo.products.delete(id, handleResponse(res))
})

// Run
app.listen(PORT_PRODUCTS, () => {
  console.log(`Products service running on port ${PORT_PRODUCTS}`)
})

export default app