import { generateID } from '../../../utils/generate.utils.js'
import SQL from '../sql.db.js'

class ProductsSQL extends SQL {
  constructor() {
    super()
  }

  getAll(callback) {
    this.pool.query('SELECT * FROM products', (error, products) => {
      if (error) return callback(error, error.sqlMessage || error.code, null)
      else return callback(null, 'Products retrieved successfully', products)
    })
  }

  getByID(id, callback) {
    this.pool.query(
      'SELECT * FROM products where products.id = ?',
      [id],
      (error, product) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (product.length <= 0) return callback ('Error', 'Product not found', null)
        else return callback(null, 'Product retrieved successfully', product)
      }
    )
  }

  create(productData, callback) {
    const id = generateID()
    productData = {
      id,
      ...productData
    }

    this.pool.query(
      'INSERT INTO products SET ?',
      [productData],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result === undefined) return callback('Error', 'Product not created', null)
        this.pool.query(
          'SELECT * FROM products where products.id = ?',
          [id],
          (error, product) => {
            if (error) return callback(error, error.sqlMessage || error.code, null)
            else if (product.length <= 0) return callback ('Error', 'Product not created', null)
            else return callback(null, 'Product created successfully', product)
          }
        )
      }
    )
  }

  update(id, productData, callback) {
    this.pool.query(
      'UPDATE products SET ? WHERE products.id = ?',
      [productData, id],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result.affectedRows === 0) return callback ('Error', 'Product not found', null)
        this.pool.query(
          'SELECT * FROM products where products.id = ?',
          [id],
          (error, product) => {
            if (error) return callback(error, error.sqlMessage || error.code, null)
            else if (product.length <= 0) return callback ('Error', 'Product not found', null)
            else return callback(null, 'Product updated successfully', product)
          }
        )
      }
    )
  }

  delete(id, callback) {
    this.pool.query(
      'DELETE FROM products WHERE products.id = ?',
      [id],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result.affectedRows === 0) return callback ('Error', 'Product not found', null)
        else return callback(null, 'Product deleted successfully', null)
      }
    )
  }
}

export default ProductsSQL