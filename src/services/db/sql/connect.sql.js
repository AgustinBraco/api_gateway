import { createPool } from 'mysql'
import '../../../config/environment.js'

export class SQL {
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
      console.log('SQL connected successfully')
    } catch (error) {
      console.error('SQL connection error:', error)
      process.exit(1)
    }
  }
}
