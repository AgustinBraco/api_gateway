import axios from 'axios'
import { Router } from 'express'
import ProductDTO from '../dto/product.dto.js'
import { isInvalidParam, isValidProduct } from '../utils/data.utils.js'

const productsRoutes = Router()

// Get all
productsRoutes.get('/:db/getProducts', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db))
    return res.status(400).json({ error: 'Parametro inválido'})

  try {
    const response = await axios.get(`http://localhost:3001/service/products/${db}/getProducts`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

// Create
productsRoutes.post('/:db/createProduct', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db))
    return res.status(400).json({ error: 'Parametro inválido'})

  let product
  const productData = req.body
  if (isValidProduct(productData))
    product = new ProductDTO(productData)
  else
    return res.status(400).json({ error: 'Cuerpo inválido'})

  try {
    const response = await axios.post(`http://localhost:3001/service/products/${db}/createProduct`, product)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

export default productsRoutes