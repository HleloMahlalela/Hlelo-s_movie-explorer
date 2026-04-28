// handles all communication with backend auth endpoints.

const BASE = 'http://localhost:5000/api'

// registerUser 
// sends a POST request to register a new user
export const registerUser = async (username, email, password) => {
  const response = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  return response.json()
}

// loginUser 
// sends a POST request to login and get a JWT token
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

// addMovieToBackend
// sends a POST request to save a movie to the database
// requires a valid JWT token in the Authorization header
export const addMovieToBackend = async (movie, token) => {
  const response = await fetch(`${BASE}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(movie)
  })
  return response.json()
}

// getUserMovies 
// fetches all movies saved by the logged in user
export const getUserMovies = async (token) => {
  const response = await fetch(`${BASE}/movies`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.json()
}