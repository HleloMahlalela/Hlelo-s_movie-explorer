// server setup
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

// load environment variables from .env file
dotenv.config()

// import route files
const authRoutes = require('./routes/authRoutes')
const movieRoutes = require('./routes/movieRoutes')

// import database connection — this runs the connection test on startup
require('./config/db')

// create the Express app
const app = express()

// enable CORS so the frontend can communicate with the backend
app.use(cors({
  origin: 'http://localhost:5173'
}))

// parse incoming JSON request bodies
app.use(express.json())

//routes

//authentication routes — register and login
app.use('/api/auth', authRoutes)

// movie routes, CRUD for user movies
app.use('/api/movies', movieRoutes)

// simple route to confirm the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Mosh&Chill API is running' })
})

//start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})