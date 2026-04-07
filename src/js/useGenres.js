// Custom hook that fetches and returns the genre list from TMDB.

import { useState, useEffect } from 'react'
import { fetchGenres } from '../services/api'
import { data } from 'react-router-dom'

function useGenres() {
  //stores list of genre object fetched from TMDB
  // format: {id: 28, name: 'Action'}
  const [genres, setGenres] = useState([])

  //fetches genre once on hook's first run
  useEffect(() => {
    fetchGenres().then(data => {
      setGenres(data.genres)
    })
  },[] //empty array to show that this only runs once on mount

  )

  return { genres }
}

export default useGenres