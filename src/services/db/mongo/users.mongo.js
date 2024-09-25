import Mongo from '../mongo.db.js'

class UsersMongo extends Mongo {
  constructor() {
    super()
  }

  getAll(callback) {
    console.log('Mongo - Users - Get all')
  }

  create(user, callback) {
    console.log('Mongo - Users - Create')
  }
}

export default UsersMongo