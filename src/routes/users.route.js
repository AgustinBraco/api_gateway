import axios from 'axios'
import { Router } from 'express'
import UserDTO from '../dto/user.dto.js'
import { isInvalidParam, isValidUser } from '../utils/data.utils.js'

const usersRoutes = Router()

// Get all
usersRoutes.get('/:db/getUsers', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db))
    return res.status(400).json({ error: 'Parametro inválido'})

  try {
    console.log("getUsers from gateway")
    const response = await axios.get(`http://localhost:3002/service/users/${db}/getUsers`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

// Create
usersRoutes.post('/:db/createUser', async (req, res) => {
  const { db } = req.params
  if (isInvalidParam(db))
    return res.status(400).json({ error: 'Parametro inválido'})

  let user
  const userData = req.body
  if (isValidUser(userData))
    user = new UserDTO(userData)
  else
    return res.status(400).json({ error: 'Cuerpo inválido'})

  try {
    const response = await axios.post(`http://localhost:3002/service/users/${db}/createUser`, user)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

export default usersRoutes