// Browse page — shows movie grid, search, and genre filters.

import MovieCard from '../components/MovieCard'
import useMovies from '../js/useMovies'
import useGenres from '../js/useGenres'
import '../styles/list.css'

function List() {
  //get movie data and interation handlers from the custom hook
  const {
    movies,
    loading,
    query,
    activeGenre,
    handleSearch,
    handleGenre
  } = useMovies()

  //get genre list
  const { genres} = useGenres()

  return (
    <div className='list'>
      <h2 className='list__title'>Browse Movies</h2>

      {/*search input*/}
      <input 
          type="text" 
          className="list__search" 
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
      />
      {/*genre filter button rendered from useGenres*/}
      <div className="list__genres">
        <button className={`list__genre-btn ${activeGenre === null ? 'list__genre-btn--active' : ''}`}
                onClick={() => handleGenre(null)}
        >
          ALL
        </button>

        {/*one btn per genre fetched from TMDB*/}
        {genres.map(genre => (
          <button className={`list__genre-btn ${activeGenre === genre.id ? 'list__genre-btn--active' : ''}`}
                  key={genre.id}
                  onClick={() => handleGenre(genre.id)}
          >
            {genre.name}
          </button>

        ))}

      </div>

      {/*loading state*/}
      {loading && (
        <p className="list__status">Loading movies...</p>
      )}

      {/*empty state, show if the API returns no results*/}
      {!loading && movies.length === 0 && (
        <p className="list__status">No movies found!</p>
      )}

      {/*movie grid, one moviecard rendered per movie in state*/}
      <div className="list__grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
    </div>
  )
}

export default List