import productsRoutes from './routes/products.route.js'
import usersRoutes from './routes/users.route.js'

const router = app => {
  app.use('/api/products', productsRoutes);
  app.use('/api/users', usersRoutes);
};

export default router;