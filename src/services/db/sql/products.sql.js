import SQL from '../sql.db.js'

class ProductsSQL extends SQL {
  constructor() {
    super()
  }

  getAll(callback) {
    console.log('SQL - Products - Get all')
  }

  create(product, callback) {
    console.log('SQL - Products - Create')
  }
}

export default ProductsSQL