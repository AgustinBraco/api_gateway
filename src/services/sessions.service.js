import express from 'express'
import session from 'express-session';
import morgan from 'morgan'
import cors from 'cors'
import '../config/environment.js'
import databases from './db/db.js'
import UserDTO from '../dto/user.dto.js'
import SessionDTO from '../dto/session.dto.js'
import { isInvalidDB, isInvalidUser } from '../utils/validate.utils.js'

// Init
const app = express()
const PORT_SESSIONS = app.set('port', process.env.PORT_SESSIONS || 3003).settings.port

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

// Register
app.post('/service/sessions/:db/register', (req, res) => {
  const { db } = req.params
  const sessionData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  if (isInvalidUser(sessionData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })

  const session = new UserDTO(sessionData)
  db === 'sql'
    ? databases.sql.sessions.register(req, session, handleResponse(res))
    : databases.mongo.sessions.register(req, session, handleResponse(res))
})

// Login
app.post('/service/sessions/:db/login', (req, res) => {
  const { db } = req.params
  const sessionData = req.body

  if (isInvalidDB(db))
    return res.status(400).json({ status: 'error', message: 'Invalid database', data: null })
  
  if (isInvalidUser(sessionData))
    return res.status(400).json({ status: 'error', message: 'Invalid body', data: null })

  const session = new SessionDTO(sessionData)
  db === 'sql'
    ? databases.sql.sessions.login(req, session, handleResponse(res))
    : databases.mongo.sessions.login(req, session, handleResponse(res))
})

// Run
app.listen(PORT_SESSIONS, () => {
  console.log(`Sessions service running on port ${PORT_SESSIONS}`)
})

export default app