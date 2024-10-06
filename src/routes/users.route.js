import axios from 'axios'
import { Router } from 'express'

const usersRoutes = Router()

// Get all
usersRoutes.get('/:db/getUsers', async (req, res) => {
  const { db } = req.params
  try {
    const response = await axios.get(`http://localhost:3002/service/users/${db}/getUsers`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Get by ID
usersRoutes.get('/:db/getUser/:id', async (req, res) => {
  const { db, id } = req.params
  try {
    const response = await axios.get(`http://localhost:3002/service/users/${db}/getUser/${id}`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Create
usersRoutes.post('/:db/createUser', async (req, res) => {
  const { db } = req.params
  const user = req.body
  try {
    const response = await axios.post(`http://localhost:3002/service/users/${db}/createUser`, user)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Update
usersRoutes.put('/:db/updateUser/:id', async (req, res) => {
  const { db, id } = req.params
  const user = req.body
  try {
    const response = await axios.put(`http://localhost:3002/service/users/${db}/updateUser/${id}`, user)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Delete
usersRoutes.delete('/:db/deleteUser/:id', async (req, res) => {
  const { db, id } = req.params
  try {
    const response = await axios.delete(`http://localhost:3002/service/users/${db}/deleteUser/${id}`)
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

export default usersRoutes