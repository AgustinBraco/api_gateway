import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './config/environment.js'
import router from './router.js'

// Init
const app = express()
const PORT_GATEWAY = app.set('port', process.env.PORT_GATEWAY || 3000).settings.port

// Middlewares
app.use(express.json()) // JSON parser
app.use(morgan('dev')) // Show requests
app.use(cors()) // Whitelisting

// Run
router(app)

app.listen(PORT_GATEWAY, () => {
  console.log(`API Gateway running on port ${PORT_GATEWAY}`)
})