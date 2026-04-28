// Defines all movie CRUD routes for the API.

const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController')

// GET /api/movies
// gets all movies for the logged in user
router.get('/', protect, getMovies)

// GET /api/movies/:id
// gets a single movie by ID
router.get('/:id', protect, getMovieById)

// POST /api/movies
// adds a new movie
router.post('/', protect, addMovie)

// PUT /api/movies/:id
// updates a movie by ID
router.put('/:id', protect, updateMovie)

// DELETE /api/movies/:id
// deletes a movie by ID
router.delete('/:id', protect, deleteMovie)

module.exports = router