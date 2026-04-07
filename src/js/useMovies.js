// Custom hook that manages movie data for the list page.
/*Handles:
1. Fetching trending movies on 1st page load
2. Searching movies by user typed quiries
3. Filtering movies by a selected genre ID */

import { useEffect, useState } from 'react'
import { fetchTrending, searchMovies, fetchByGenre } from '../services/api'

function useMovies() {
  //stores list of movies being currently shown on grid
  const [movies, setMovies] = useState([])
  //tracks data loading from API
  const [loading, setLoading] = useState(true)
  //tracks current value of search input
  const [query, setQuery] = useState('')
  //tracks currently selected genre id 
  const [activeGenre, setActiveGenre] = useState(null) //null -> ALL

  //for fetching trending movie on hook's first run
  useEffect(() => {
    fetchTrending().then(data => {
      setMovies(data.results)
      setLoading(false)
    })
  },[]) //Runs once on mount

  //called each time the user types onto the search input
  const handleSearch = (value) => {
    setQuery(value)
    setActiveGenre(null) //clear active genre when searching
    //returns to trending movies once search input is cleared
    if (value.trim() === '') {
      setLoading(true)
      fetchTrending().then(data => {
        setMovies(data.results)
        setLoading(false)
      })
      return
    }  
    //otherwise search for matching typed quiry
    setLoading(true)
    searchMovies(value).then(data =>{
      setMovies(data.results)
      setLoading(false)
    })
  }
  //called once the user clicks the genre btn  
  const handleGenre  = (genreId) => {
    setActiveGenre(genreId)
    setQuery('') //clears the search input when switching genres
    setLoading(true)

    //when All is clicked, revert to trending movies
    if (!genreId) {
      fetchTrending().then(data => {
        setMovies(data.results)
        setLoading(false)
      })
      return
    }

    //otherwise, fetch movies belonging to selected genre
    fetchByGenre(genreId).then(data => {
      setMovies(data.results)
      setLoading(false)
    })
  }

  return { movies, loading, query, activeGenre, handleSearch, handleGenre }
}

export default useMovies