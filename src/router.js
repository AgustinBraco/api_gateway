import productsRoutes from './routes/products.route.js'
import usersRoutes from './routes/users.route.js'
import sessionsRoutes from './routes/sessions.route.js'

const router = app => {
  app.use('/api/products', productsRoutes)
  app.use('/api/users', usersRoutes)
  app.use('/api/sessions', sessionsRoutes)
}

export default router