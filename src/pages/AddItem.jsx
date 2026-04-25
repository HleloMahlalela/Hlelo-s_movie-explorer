import { useState } from 'react'
import '../styles/forms.css'

function AddItem() {
  //one state variable per form field
  const [title, setTitle]   = useState('')
  const [genre, setGenre]   = useState('')
  const [rating, setRating] = useState('')
  const [notes, setNotes]   = useState('')

  //stores validation error messages — one key per field
  const [errors, setErrors] = useState({})

  //controls whether the success message is shown
  const [submitted, setSubmitted] = useState(false)

  //called when the form is submitted
  const handleSubmit = (e) => {
    //stops the browser from reloading the page on submit
    e.preventDefault()

    //build an errors object — add an entry for each invalid field
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Movie title is required.'
    }

    if (!genre.trim()) {
      newErrors.genre = 'Genre is required.'
    }

    if (!rating || rating < 1 || rating > 10) {
      newErrors.rating = 'Please enter a rating between 1 and 10.'
    }

    //if any errors exist, update state and stop — do not submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    //validation passed — log the data and show success message
    console.log('Movie added:', { title, genre, rating, notes })
    setSubmitted(true)

    // reset all fields after successful submission
    setTitle('')
    setGenre('')
    setRating('')
    setNotes('')
    setErrors({})
  }

  return (
    <div className="add-form">

      {/* page title */}
      <h2 className="add-form__title">Add a Movie</h2>

      {/*success banner — shown after a valid submission */}
      {submitted && (
        <div className="add-form__success">
          Movie added successfully!
        </div>
      )}

      {/*form — calls handleSubmit when submitted */}
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
          {/* error message shown if title is missing */}
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
          {/* error message shown if genre is missing */}
          {errors.genre && (
            <span className="add-form__error">{errors.genre}</span>
          )}
        </div>

        {/* rating field — must be between 1 and 10 */}
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
          {/* error message shown if rating is missing or out of range */}
          {errors.rating && (
            <span className="add-form__error">{errors.rating}</span>
          )}
        </div>

        {/* notes field — optional, no validation */}
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
        <button type="submit" className="add-form__submit">
          Add Movie
        </button>

      </form>

    </div>
  )
}

export default AddItem