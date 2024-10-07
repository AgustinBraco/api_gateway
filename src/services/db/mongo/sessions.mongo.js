import UserModel from '../mongo/schemas/users.schema.js'
import { isInvalidPassword } from '../../../utils/password.utils.js'
import Mongo from '../mongo.db.js'

class SessionsMongo extends Mongo {
  constructor() {
    super()
  }

  async register(req, sessionData, callback) {
    try {
      const session = await UserModel.create(sessionData)
      if (!session)
        return callback('Error', 'User not created', null)
      
      const user = {
        email: sessionData.email,
        role: 'user'
      }
      req.session.user = user

      return callback(null, 'User registered successfully', user)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }

  async login(req, sessionData, callback) {
    try {
      const session = await UserModel.findOne({ email: sessionData.email })

      if (!session)
        return callback('Error', 'User not found', null)

      if (isInvalidPassword(sessionData, session))
        return callback('Error', 'Invalid credentials', null)

      const user = {
        email: sessionData.email,
        role: 'user'
      }
      req.session.user = user

      return callback(null, 'User signed in successfully', user)
    } catch (error) {
      return callback(error, error.errorResponse.errmsg, null)
    }
  }
}

export default SessionsMongo