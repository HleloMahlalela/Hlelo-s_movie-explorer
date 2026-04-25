import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieById } from '../services/api'
import { getBackdropUrl, formatYear, formatRating } from '../js/utils'
import '../styles/details.css'

function Details() {
  //reads the :id segment from the URL e.g. /details/550 gives id = '550'
  const { id } = useParams()

  //lets the back button return to the previous page
  const navigate = useNavigate()

  //stores the fetched movie object
  const [movie, setMovie] = useState(null)

  //tracks whether the fetch is still in progress
  const [loading, setLoading] = useState(true)

  //fetch the movie whenever the ID in the URL changes
  useEffect(() => {
    fetchMovieById(id).then(data => {
      setMovie(data)
      setLoading(false)
    })
  }, [id]) //re-runs if the user navigates to a different movie

  //show loading message while fetch is in progress
  if (loading) {
    return <p className="list__status" style={{ padding: '2rem' }}>Loading...</p>
  }

  //show error if movie was not found
  if (!movie) {
    return <p className="list__status" style={{ padding: '2rem' }}>Movie not found.</p>
  }

  return (
    <div className="details">

      {/*backdrop image — only renders if TMDB has one*/}
      {getBackdropUrl(movie.backdrop_path) && (
        <img
          className="details__backdrop"
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
        />
      )}

      <div className="details__content">

        {/*back button — returns to previous page in history*/}
        <button
          className="details__back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/*movie title*/}
        <h1 className="details__title">{movie.title}</h1>

        {/* tagline — only shown if it exists */}
        {movie.tagline && (
          <p className="details__tagline">"{movie.tagline}"</p>
        )}

        {/*rating, runtime and release year*/}
        <p className="details__meta">
          ⭐ {formatRating(movie.vote_average)}
          &nbsp;|&nbsp;
          🕐 {movie.runtime} min
          &nbsp;|&nbsp;
          📅 {formatYear(movie.release_date)}
        </p>

        {/*genre badges*/}
        <div className="details__genres">
          {movie.genres?.map(genre => (
            <span key={genre.id} className="details__badge">
              {genre.name}
            </span>
          ))}
        </div>

        {/*overview*/}
        <h2 className="details__overview-heading">Overview</h2>
        <p className="details__overview">{movie.overview}</p>

      </div>

    </div>
  )
}

export default Details