// Handles all communication with the TMDB API.

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE = 'https://api.themoviedb.org/3'

// Fetchs list of trending movies this week
export const fetchTrending = () => 
    fetch(`${BASE}/trending/movie/week?api_key=${KEY}`)
    .then(r => r.json())


// Search movies matching user's typed query string
export const searchMovies = (query) => 
    fetch(`${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}`)
    .then(r => r.json())


// Fetches full list of movie genre names and ids from TMDB
export const fetchGenres = () => 
    fetch(`${BASE}/genre/movie/list?api_key=${KEY}`)
    .then(r => r.json())



// Fetch movies by genre ID
export const fetchByGenre = (genreId) => 
    fetch(`${BASE}/discover/movie?api_key=${KEY}&with_genres=${genreId}`)
    .then(r => r.json())


// Fetch single movie details by ID
export const fetchMovieById = (id) => 
    fetch(`${BASE}/movie/${id}?api_key=${KEY}`)
    .then(r => r.json())
