// This file creates and exports the connection to the
// PostgreSQL database using the pg library.


const { Pool } = require('pg')
const dotenv = require('dotenv')
// load environment variables from .env file
dotenv.config()


// create a connection pool using the credentials from .env
// a pool manages multiple connections efficiently
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
})

// test the connection when the server starts
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.message)
  } else {
    console.log('Connected to mosh_chill database')
    release()
  }
})

module.exports = pool