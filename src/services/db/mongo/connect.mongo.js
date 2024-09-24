import mongoose from 'mongoose'
import '../../../config/environment.js'

export class Mongo {
  constructor() {
    this.connect()
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log('MongoDB connected successfully')
    } catch (error) {
      console.error('MongoDB connection error:', error)
      process.exit(1)
    }
  }
}
