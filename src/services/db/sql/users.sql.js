import { generateID } from '../../../utils/generate.utils.js'
import SQL from '../sql.db.js'

class UsersSQL extends SQL {
  constructor() {
    super()
  }

  getAll(callback) {
    this.pool.query('SELECT * FROM users', (error, users) => {
      if (error) return callback(error, error.sqlMessage || error.code, null)
      else return callback(null, 'Users retrieved successfully', users)
    })
  }

  getByID(id, callback) {
    this.pool.query(
      'SELECT * FROM users where users.id = ?',
      [id],
      (error, user) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (user.length <= 0) return callback ('Error', 'User not found', null)
        else return callback(null, 'User retrieved successfully', user)
      }
    )
  }

  create(userData, callback) {
    const id = generateID()
    userData = {
      id,
      ...userData
    }

    this.pool.query(
      'INSERT INTO users SET ?',
      [userData],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result === undefined) return callback('Error', 'User not created', null)
        this.pool.query(
          'SELECT * FROM users where users.id = ?',
          [id],
          (error, user) => {
            if (error) return callback(error, error.sqlMessage || error.code, null)
            else if (user.length <= 0) return callback ('Error', 'User not created', null)
            else return callback(null, 'User created successfully', user)
          }
        )
      }
    )
  }

  update(id, userData, callback) {
    this.pool.query(
      'UPDATE users SET ? WHERE users.id = ?',
      [userData, id],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result.affectedRows === 0) return callback ('Error', 'User not found', null)
        this.pool.query(
          'SELECT * FROM users where users.id = ?',
          [id],
          (error, user) => {
            if (error) return callback(error, error.sqlMessage || error.code, null)
            else if (user.length <= 0) return callback ('Error', 'User not found', null)
            else return callback(null, 'User updated successfully', user)
          }
        )
      }
    )
  }

  delete(id, callback) {
    this.pool.query(
      'DELETE FROM users WHERE users.id = ?',
      [id],
      (error, result) => {
        if (error) return callback(error, error.sqlMessage || error.code, null)
        else if (result.affectedRows === 0) return callback ('Error', 'User not found', null)
        else return callback(null, 'User deleted successfully', null)
      }
    )
  }
}

export default UsersSQL