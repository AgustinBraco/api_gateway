// SQL
import ProductsSQL from './sql/products.sql.js'
import UsersSQL from './sql/users.sql.js'
import SessionsSQL from './sql/sessions.sql.js'

// Mongo
import ProductsMongo from './mongo/products.mongo.js'
import UsersMongo from './mongo/users.mongo.js'
import SessionsMongo from './mongo/sessions.mongo.js'

const databases = {
  sql: {
    products: new ProductsSQL(),
    users: new UsersSQL(),
    sessions: new SessionsSQL()
  },
  mongo: {
    products: new ProductsMongo(),
    users: new UsersMongo(),
    sessions: new SessionsMongo()
  }
}

export default databases