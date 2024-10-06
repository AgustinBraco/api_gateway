import ProductModel from '../mongo/schemas/products.schema.js'
import Mongo from '../mongo.db.js'

class ProductsMongo extends Mongo {
  constructor() {
    super()
  }

  async getAll(callback) {
    try {
      const products = await ProductModel.find()
      return callback(null, 'Products retrieved successfully', products)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async getByID(id, callback) {
    try {
      const product = await ProductModel.findById(id)
      if (!product) return callback('Error', 'Product not found', null)
      else return callback(null, 'Product retrieved successfully', product)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async create(productData, callback) {
    try {
      const product = await ProductModel.create(productData)
      if (!product) return callback('Error', 'Product not created', null)
      else return callback(null, 'Product created successfully', product)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async update(id, productData, callback) {
    try {
			const productFound = await ProductModel.findById(id)
      if (!productFound) return callback('Error', 'Product not found', null)
      const result = await ProductModel.updateOne({ _id: id }, productData)
      if (result.modifiedCount === 0) return callback('Error', 'Product not modified', null)
      const product = await ProductModel.findById(id)
      if (!product) return callback('Error', 'Product not modified', null)
      else return callback(null, 'Product modified successfully', product)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async delete(id, callback) {
    try {
			const productFound = await ProductModel.findById(id)
      if (!productFound) return callback('Error', 'Product not found', null)
      const result = await ProductModel.deleteOne({ _id: id })
      if (result.deletedCount === 0) return callback('Error', 'Product not deleted', null)
      else return callback(null, 'Product deleted successfully', null)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }
}

export default ProductsMongo