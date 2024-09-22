import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import '../../config/environment.js'
import { sql, mongo } from '../../db/index.js'

// Init
const app = express()
const PORT_USERS = app.set('port', process.env.PORT_USERS || 3002).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors()) // Whitelisting

// Routes
app.get('/service/sql/users', (req, res) => {
  res.json([{}])
})

app.get('/service/mongo/users', (req, res) => {
  res.json([{}])
})

// Run
app.listen(PORT_USERS, () => {
  console.log(`Users service running on port ${PORT_USERS}`)
})
