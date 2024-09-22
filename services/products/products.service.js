import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import '../../config/environment.js'
import { sql, mongo } from '../../db/index.js'

// Init
const app = express()
const PORT_PRODUCTS = app.set('port', process.env.PORT_PRODUCTS || 3001).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors({origin: 'localhost'})) // Whitelisting

// Routes
app.get('/service/sql/products', (req, res) => {
  res.json([{}])
})

app.get('/service/mongo/products', (req, res) => {
  res.json([{}])
})

// Run
app.listen(PORT_PRODUCTS, () => {
  console.log(`Products service running on port ${PORT_PRODUCTS}`)
})
