import axios from 'axios'
import { Router } from 'express'
import { isInvalidDB, isInvalidAdmin } from '../utils/validate.utils.js'

const sessionsRoutes = Router()

// Register
sessionsRoutes.post('/:db/register', async (req, res) => {
  const { db } = req.params
  const session = req.body
  try {
    const response = await axios.post(`http://localhost:3003/service/sessions/${db}/register`, session)
    req.session.user = response.data.data
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Login
sessionsRoutes.post('/:db/login', async (req, res) => {
  const { db } = req.params
  const session = req.body
  try {
    const response = await axios.post(`http://localhost:3003/service/sessions/${db}/login`, session)
    req.session.user = response.data.data
    return res.status(response.data.statusCode).json({ status: response.data.status, message: response.data.message, data: response.data.data })
  } catch (error) {
    return res.status(error.response.status).json({ status: 'error', message: error.response.statusText, data: null })
  }
})

// Login admin
sessionsRoutes.post('/:db/login/admin', async (req, res) => {
  const admin = req.body
  const key = req.headers.apikey

  if (isInvalidAdmin(admin, key))
    return res.status(403).json({ status: 'error', message: 'Access restricted' })
  
  req.session.user = admin
  return res.status(200).json({ status: 'success', message: 'Admin loged successfully' })
})

// Current
sessionsRoutes.get('/:db/current', async (req, res) => {
  const { db } = req.params
  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  try {
    const user = req.session.user
    if (!user)
      return res.status(400).json({ status: 'error', message: 'User not loged', data: null })
    else
      return res.status(200).json({ status: 'success', message: 'User retrieved succesffully', data: user })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', data: null })
  }
})

// Logout
sessionsRoutes.delete('/:db/logout', async (req, res) => {
  const { db } = req.params
  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  try {
    req.session.destroy()
    return res.status(200).json({ status: 'success', message: 'User logout successfully', data: null })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error', data: null })
  }
})

export default sessionsRoutes