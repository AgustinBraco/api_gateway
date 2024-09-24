import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import axios from 'axios'
import './config/environment.js'
import { ProductDTO, UserDTO } from './dto/index.js'
import { isInvalidParam, isValidUser, isValidProduct } from './utils/index.js'

// Init
const app = express()
const PORT_GATEWAY = app.set('port', process.env.PORT_GATEWAY || 3000).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors()) // Whitelisting

// Products routes
app.get('/api/:db/getProducts', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db)) return

  try {
    const response = await axios.get(`http://localhost:3001/service/${db}/getProducts`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.post('/api/:db/createProduct', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db)) return

  let product
  const productData = req.body
  if (isValidProduct(productData))
    product = new ProductDTO(productData)
  else
    return res.status(400).json({ error: 'Cuerpo inválido'})

  try {
    const response = await axios.post(`http://localhost:3001/service/${db}/createProduct`, product)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

// Users routes
app.get('/api/:db/getUsers', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db)) return

  try {
    const response = await axios.get(`http://localhost:3002/service/${db}/getUsers`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

app.post('/api/:db/createUser', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db)) return

  let user
  const userData = req.body
  if (isValidUser(userData))
    user = new UserDTO(userData)
  else
    return res.status(400).json({ error: 'Datos inválidos'})

  try {
    const response = await axios.post(`http://localhost:3002/service/${db}/createUser`, user)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

// Run
app.listen(PORT_GATEWAY, () => {
  console.log(`API Gateway running on port ${PORT_GATEWAY}`)
})