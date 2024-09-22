import '../../config/environment.js'
import mysql from 'mysql'
import myConnection from 'express-myconnection'

export const sql = app => {
  const config = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
  };

  const connection = mysql.createConnection(config);

  try {
    connection.connect();
    console.log('SQL connected successfully');
  } catch (error) {
    console.error('SQL connection error:', error);
    process.exit(1);
  }

  app.use(myConnection(mysql, config, 'single'));
};