import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addMovieToBackend } from '../services/authApi'
import '../styles/forms.css'

function AddItem() {
  // one state variable per form field
  const [title, setTitle]   = useState('')
  const [genre, setGenre]   = useState('')
  const [rating, setRating] = useState('')
  const [notes, setNotes]   = useState('')

  // stores validation error messages
  const [errors, setErrors] = useState({})

  // stores server error message
  const [serverError, setServerError] = useState('')

  // controls whether the success message is shown
  const [submitted, setSubmitted] = useState(false)

  // tracks if the form is being submitted
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    // validate fields
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Movie title is required.'
    if (!genre.trim()) newErrors.genre = 'Genre is required.'
    if (!rating || rating < 1 || rating > 10) {
      newErrors.rating = 'Please enter a rating between 1 and 10.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // gets the token from localStorage
    const token = localStorage.getItem('token')

    // if no token the user is not logged in
    if (!token) {
      navigate('/login')
      return
    }

    // sends the movie to the backend
    setLoading(true)
    const data = await addMovieToBackend(
      { title, genre, rating: Number(rating), notes },
      token
    )
    setLoading(false)

    if (data.movie) {
      // movie saved successfully
      setSubmitted(true)
      setTitle('')
      setGenre('')
      setRating('')
      setNotes('')
      setErrors({})
    } else {
      setServerError(data.message || 'Failed to add movie. Please try again.')
    }
  }

  return (
    <div className="add-form">

      {/* page title */}
      <h2 className="add-form__title">Add a Movie</h2>

      {/* success banner */}
      {submitted && (
        <div className="add-form__success">
          Movie added successfully!
        </div>
      )}

      {/* server error banner */}
      {serverError && (
        <div className="add-form__success" style={{ backgroundColor: '#3a1a1a', color: '#cf6f6f', borderColor: '#cf6f6f' }}>
          {serverError}
        </div>
      )}

      <form className="add-form__form" onSubmit={handleSubmit}>

        {/* movie title field */}
        <div className="add-form__group">
          <label className="add-form__label">Movie Title</label>
          <input
            type="text"
            className={`add-form__input ${errors.title ? 'add-form__input--error' : ''}`}
            placeholder="e.g. Inception"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <span className="add-form__error">{errors.title}</span>
          )}
        </div>

        {/* genre field */}
        <div className="add-form__group">
          <label className="add-form__label">Genre</label>
          <input
            type="text"
            className={`add-form__input ${errors.genre ? 'add-form__input--error' : ''}`}
            placeholder="e.g. Sci-Fi"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          {errors.genre && (
            <span className="add-form__error">{errors.genre}</span>
          )}
        </div>

        {/* rating field */}
        <div className="add-form__group">
          <label className="add-form__label">Your Rating (1–10)</label>
          <input
            type="number"
            className={`add-form__input ${errors.rating ? 'add-form__input--error' : ''}`}
            placeholder="e.g. 8"
            value={rating}
            min="1"
            max="10"
            onChange={(e) => setRating(e.target.value)}
          />
          {errors.rating && (
            <span className="add-form__error">{errors.rating}</span>
          )}
        </div>

        {/* notes field */}
        <div className="add-form__group">
          <label className="add-form__label">Notes (optional)</label>
          <textarea
            className="add-form__textarea"
            placeholder="What did you think of it?"
            value={notes}
            rows={3}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="add-form__submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>

      </form>

    </div>
  )
}

export default AddItem