import { createPool } from 'mysql'
import '../../config/environment.js'

class SQL {
  constructor() {
    this.connect()
  }

  connect() {
    const pool = createPool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      port: process.env.SQL_PORT,
      database: process.env.SQL_DATABASE,
    })

    try {
      pool.query('SELECT 1')
      console.log(this.constructor.name, 'connected successfully')
    } catch (error) {
      console.error(this.constructor.name, 'connection error:', error)
      process.exit(1)
    }

    return pool
  }
}

export default SQL