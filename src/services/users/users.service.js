import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import '../../config/environment.js'
import databases from '../db/index.js'

// Init
const app = express()
const PORT_USERS = app.set('port', process.env.PORT_USERS || 3002).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors({origin: 'localhost'})) // Whitelisting

// Get all
app.get('/service/:db/getUsers', (req, res) => {
  const { db } = req.params
  let users

  users = db === 'sql' 
    ? databases.sql.users.getAll() 
    : databases.mongo.users.getAll()

  res.json([{}])
})

// Create
app.post('/service/:db/createUser', (req, res) => {
  const { db } = req.params
  const userData = req.body
  let user

  user = db === 'sql' 
    ? databases.sql.users.create(userData) 
    : databases.mongo.users.create(userData)

  res.json([{}])
})

// Run
app.listen(PORT_USERS, () => {
  console.log(`Users service running on port ${PORT_USERS}`)
})
