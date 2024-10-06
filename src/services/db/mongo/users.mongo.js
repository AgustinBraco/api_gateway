import UserModel from '../mongo/schemas/users.schema.js'
import Mongo from '../mongo.db.js'

class UsersMongo extends Mongo {
  constructor() {
    super()
  }

  async getAll(callback) {
    try {
      const users = await UserModel.find()
      return callback(null, 'Users retrieved successfully', users)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async getByID(id, callback) {
    try {
      const user = await UserModel.findById(id)
      if (!user) return callback('Error', 'User not found', null)
      else return callback(null, 'User retrieved successfully', user)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async create(userData, callback) {
    try {
      const user = await UserModel.create(userData)
      if (!user) return callback('Error', 'User not created', null)
      else return callback(null, 'User created successfully', user)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async update(id, userData, callback) {
    try {
			const userFound = await UserModel.findById(id)
      if (!userFound) return callback('Error', 'User not found', null)
      const result = await UserModel.updateOne({ _id: id }, userData)
      if (result.modifiedCount === 0) return callback('Error', 'User not modified', null)
      const user = await UserModel.findById(id)
      if (!user) return callback('Error', 'User not modified', null)
      else return callback(null, 'User modified successfully', user)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async delete(id, callback) {
    try {
			const userFound = await UserModel.findById(id)
      if (!userFound) return callback('Error', 'User not found', null)
      const result = await UserModel.deleteOne({ _id: id })
      if (result.deletedCount === 0) return callback('Error', 'User not deleted', null)
      else return callback(null, 'User deleted successfully', null)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }
}

export default UsersMongo