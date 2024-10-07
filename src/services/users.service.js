import express from 'express'
import session from 'express-session';
import morgan from 'morgan'
import cors from 'cors'
import '../config/environment.js'
import databases from './db/db.js'
import UserDTO from '../dto/user.dto.js'
import { isInvalidDB, isInvalidID, isInvalidUser } from '../utils/validate.utils.js'

// Init
const app = express()
const PORT_USERS = app.set('port', process.env.PORT_USERS || 3002).settings.port

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
app.get('/service/users/:db/getUsers', (req, res) => {
  const { db } = req.params
  
  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  db === 'sql'
    ? databases.sql.users.getAll(handleResponse(res))
    : databases.mongo.users.getAll(handleResponse(res))
})

// Get by ID
app.get('/service/users/:db/getUser/:id', (req, res) => {
  const { db, id } = req.params

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })

  db === 'sql'
    ? databases.sql.users.getByID(id, handleResponse(res))
    : databases.mongo.users.getByID(id, handleResponse(res))
})

// Create
app.post('/service/users/:db/createUser', (req, res) => {
  const { db } = req.params
  const userData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  if (isInvalidUser(userData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })
  
  const user = new UserDTO(userData)
  db === 'sql'
    ? databases.sql.users.create(user, handleResponse(res))
    : databases.mongo.users.create(user, handleResponse(res))
})

// Update by ID
app.put('/service/users/:db/updateUser/:id', (req, res) => {
  const { db, id } = req.params
  const userData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })

  if (isInvalidUser(userData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })
  
  const user = new UserDTO(userData)
  db === 'sql'
    ? databases.sql.users.update(id, user, handleResponse(res))
    : databases.mongo.users.update(id, user, handleResponse(res))
})

// Delete by ID
app.delete('/service/users/:db/deleteUser/:id', (req, res) => {
  const { db, id } = req.params

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })

  if (isInvalidID(id))
    return res.status(400).json({ status: 'error', message: 'Invalid ID', data: null })
  
  db === 'sql'
    ? databases.sql.users.delete(id, handleResponse(res))
    : databases.mongo.users.delete(id, handleResponse(res))
})

// Run
app.listen(PORT_USERS, () => {
  console.log(`Users service running on port ${PORT_USERS}`)
})

export default app