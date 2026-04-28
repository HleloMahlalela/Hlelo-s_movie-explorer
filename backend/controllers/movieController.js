// Handles all CRUD operations for movies.

const pool = require('../config/db')

// getMovies 
// GET /api/movies

// returns all movies added by the logged in user
const getMovies = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM movies WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )

    res.status(200).json(result.rows)

  } catch (err) {
    console.error('Get movies error:', err.message)
    res.status(500).json({ message: 'Server error fetching movies' })
  }
}

// getMovieById 
// GET /api/movies/:id

// returns a single movie by its ID, only if it belongs to the logged in user
const getMovieById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM movies WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.status(200).json(result.rows[0])

  } catch (err) {
    console.error('Get movie error:', err.message)
    res.status(500).json({ message: 'Server error fetching movie' })
  }
}

// ---- addMovie ----
// POST /api/movies

// adds a new movie to the logged in user's list
const addMovie = async (req, res) => {
  const { title, genre, rating, notes } = req.body

  try {
    // check required fields are provided
    if (!title || !genre || !rating) {
      return res.status(400).json({ message: 'Title, genre and rating are required' })
    }

    // check rating is between 1 and 10
    if (rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' })
    }

    const result = await pool.query(
      'INSERT INTO movies (user_id, title, genre, rating, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, genre, rating, notes]
    )

    res.status(201).json({
      message: 'Movie added successfully',
      movie: result.rows[0]
    })

  } catch (err) {
    console.error('Add movie error:', err.message)
    res.status(500).json({ message: 'Server error adding movie' })
  }
}

// updateMovie 
// PUT /api/movies/:id

// updates a movie, only if it belongs to the logged in user
const updateMovie = async (req, res) => {
  const { title, genre, rating, notes } = req.body

  try {
    // check the movie exists and belongs to the logged in user
    const check = await pool.query(
      'SELECT id FROM movies WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )

    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    // check rating is between 1 and 10 if provided
    if (rating && (rating < 1 || rating > 10)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' })
    }

    const result = await pool.query(
      'UPDATE movies SET title = $1, genre = $2, rating = $3, notes = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, genre, rating, notes, req.params.id, req.user.id]
    )

    res.status(200).json({
      message: 'Movie updated successfully',
      movie: result.rows[0]
    })

  } catch (err) {
    console.error('Update movie error:', err.message)
    res.status(500).json({ message: 'Server error updating movie' })
  }
}

// deleteMovie
// DELETE /api/movies/:id

// deletes a movie, only if it belongs to the logged in user
const deleteMovie = async (req, res) => {
  try {
    // check the movie exists and belongs to the logged in user
    const check = await pool.query(
      'SELECT id FROM movies WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )

    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    await pool.query(
      'DELETE FROM movies WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )

    res.status(200).json({ message: 'Movie deleted successfully' })

  } catch (err) {
    console.error('Delete movie error:', err.message)
    res.status(500).json({ message: 'Server error deleting movie' })
  }
}

module.exports = { getMovies, getMovieById, addMovie, updateMovie, deleteMovie }