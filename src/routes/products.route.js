import axios from 'axios'
import { Router } from 'express'

const productsRoutes = Router()

// Get all
productsRoutes.get('/:db/getProducts', async (req, res) => {
  const { db } = req.params
  try {
    const response = await axios.get(`http://localhost:3001/service/products/${db}/getProducts`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Get by ID
productsRoutes.get('/:db/getProduct/:id', async (req, res) => {
  const { db, id } = req.params
  try {
    const response = await axios.get(`http://localhost:3001/service/products/${db}/getProduct/${id}`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Create
productsRoutes.post('/:db/createProduct', async (req, res) => {
  const { db } = req.params
  const product = req.body
  try {
    const response = await axios.post(`http://localhost:3001/service/products/${db}/createProduct`, product)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Update
productsRoutes.put('/:db/updateProduct/:id', async (req, res) => {
  const { db, id } = req.params
  const product = req.body
  try {
    const response = await axios.put(`http://localhost:3001/service/products/${db}/updateProduct/${id}`, product)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Delete
productsRoutes.delete('/:db/deleteProduct/:id', async (req, res) => {
  const { db, id } = req.params
  try {
    const response = await axios.delete(`http://localhost:3001/service/products/${db}/deleteProduct/${id}`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

export default productsRoutes