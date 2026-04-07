// Reusable card that displays a single movie.

import { useNavigate } from "react-router-dom"
import { getPosterUrl, formatYear, formatRating } from '../js/utils'
import '../styles/cards.css'


function MovieCard({ movie }) {
  //useNavigate lets us change the route when card is clicked
  const navigate = useNavigate()

  //on click navigates to movie details page
  const handleClick = () => {
    navigate(`/details/${movie.id}`)
  }

  return (
    <div className="movie-card" onClick={handleClick}>

      {/* Poster image — show a fallback if TMDB has no poster for this movie */}
      {getPosterUrl(movie.poster_path) ? (
        <img
          className="movie-card__poster"
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
        />
      ) : (
        <div className="movie-card__no-poster">No Poster</div>
      )}

      {/*card text body*/}
      <div className="movie-card__body">

          {/*Movie title*/}
          <p className="movie-card__title">{movie.title}</p>

          {/*release year and rating*/}
          <p className="movie-card__meta">
            {formatYear(movie.release_date)}
            &nbsp;·&nbsp; {/*Space*/}
            {/*Add icon here Hlelo*/} 
            {formatRating(movie.vote_average)}
          </p>

      </div>

      
    </div>
  )
}

export default MovieCard