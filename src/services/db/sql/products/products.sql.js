import { SQL } from '../sql.db.js';

export class ProductsSQL extends SQL {
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