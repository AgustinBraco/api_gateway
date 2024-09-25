import SQL from '../sql.db.js'

class UsersSQL extends SQL {
  constructor() {
    super()
  }

  getAll(callback) {
    console.log('SQL - Users - Get all')
  }

  create(user, callback) {
    console.log('SQL - Users - Create')
  }
}

export default UsersSQL