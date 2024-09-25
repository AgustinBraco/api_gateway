import { Mongo } from '../mongo.db.js';

export class ProductsMongo extends Mongo {
  constructor() {
    super()
  }

  getAll(callback) {
    console.log('Mongo - Products - Get all')
  }

  create(product, callback) {
    console.log('Mongo - Products - Create')
  }
}