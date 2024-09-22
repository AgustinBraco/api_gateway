import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import axios from 'axios'
import './config/environment.js'

// Init
const app = express()
const PORT_GATEWAY = app.set('port', process.env.PORT_GATEWAY || 3000).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors()) // Whitelisting

// Router
app.get('/api/:db/products', async (req, res) => {
  const { db } = req.params
  try {
    const response = await axios.get(`http://localhost:3001/service/${db}/products`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

app.get('/api/:db/users', async (req, res) => {
  const { db } = req.params
  try {
    const response = await axios.get(`http://localhost:3002/service/${db}/users`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

// Run
app.listen(PORT_GATEWAY, () => {
  console.log(`API Gateway running on port ${PORT_GATEWAY}`)
})