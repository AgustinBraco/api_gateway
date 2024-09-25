import mongoose from 'mongoose'
import '../../../config/environment.js'

export class Mongo {
  constructor() {
    this.connect()
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log(this.constructor.name, 'connected successfully')
    } catch (error) {
      console.error(this.constructor.name, 'connection error:', error)
      process.exit(1)
    }
  }
}
