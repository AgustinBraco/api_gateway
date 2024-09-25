import ProductsSQL from './sql/products.sql.js'
import UsersSQL from './sql/users.sql.js'
import ProductsMongo from './mongo/products.mongo.js'
import UsersMongo from './mongo/users.mongo.js'

const databases = {
  sql: {
    products: new ProductsSQL(),
    users: new UsersSQL()
  },
  mongo: {
    products: new ProductsMongo(),
    users: new UsersMongo()
  }
}

export default databases