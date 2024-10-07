import { generateID } from '../../../utils/generate.utils.js'
import { isInvalidPassword } from '../../../utils/password.utils.js'
import SQL from '../sql.db.js'

class SessionsSQL extends SQL {
  constructor() {
    super()
  }

  register(req, sessionData, callback) {
    const id = generateID()
    sessionData = {
      id,
      ...sessionData
    }

    this.pool.query(
      'INSERT INTO users SET ?', 
      [sessionData],
      (error, session) => {
        if (error)
          return callback(error, error.sqlMessage || error.code, null)
        else if (session === undefined)
          return callback('Error', 'User not created', null)

        const user = {
          email: sessionData.email,
          role: 'user'
        }
        req.session.user = user

        return callback(null, 'User registered successfully', user)
      }
    )
  }

  login(req, sessionData, callback) {
    this.pool.query(
      'SELECT * FROM users WHERE users.email = ?',
      [sessionData.email],
      (error, session) => {
        if (error)
          return callback(error, error.sqlMessage || error.code, null)
        else if (session.length <= 0)
          return callback('Error', 'User not found', null)
        
        if (isInvalidPassword(sessionData, session))
          return callback('Error', 'Invalid credentials', null)

        const user = {
          email: sessionData.email,
          role: 'user'
        }
        req.session.user = user

        return callback(null, 'User signed in successfully', user)
      }
    )
  }
}

export default SessionsSQL