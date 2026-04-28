// Registration page where new users create an account.
// On successful registration the user is redirected to login.
// Styles are imported from auth.css.

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authApi'
import '../styles/auth.css'

function Register() {
  // one state variable per form field
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  // stores validation errors per field
  const [errors, setErrors] = useState({})

  // stores server error message if registration fails
  const [serverError, setServerError] = useState('')

  // tracks if the form is being submitted
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    // validate fields
    const newErrors = {}
    if (!username.trim()) newErrors.username = 'Username is required.'
    if (!email.trim())    newErrors.email    = 'Email is required.'
    if (!password)        newErrors.password = 'Password is required.'
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // sends registration request to the backend
    setLoading(true)
    const data = await registerUser(username, email, password)
    setLoading(false)

    if (data.token) {
      // registration successful. Redirects to login
      navigate('/login')
    } else {
      // show error message from server
      setServerError(data.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">

        {/* page title */}
        <h2 className="auth__title">Create Account</h2>
        <p className="auth__subtitle">Join Mosh&Chill today</p>

        {/* server error banner */}
        {serverError && (
          <div className="auth__server-error">{serverError}</div>
        )}

        <form className="auth__form" onSubmit={handleSubmit}>

          {/* username field */}
          <div className="auth__group">
            <label className="auth__label">Username</label>
            <input
              type="text"
              className={`auth__input ${errors.username ? 'auth__input--error' : ''}`}
              placeholder="e.g. hlelo123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <span className="auth__error">{errors.username}</span>
            )}
          </div>

          {/* email field */}
          <div className="auth__group">
            <label className="auth__label">Email</label>
            <input
              type="email"
              className={`auth__input ${errors.email ? 'auth__input--error' : ''}`}
              placeholder="e.g. hlelo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="auth__error">{errors.email}</span>
            )}
          </div>

          {/* password field */}
          <div className="auth__group">
            <label className="auth__label">Password</label>
            <input
              type="password"
              className={`auth__input ${errors.password ? 'auth__input--error' : ''}`}
              placeholder="at least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="auth__error">{errors.password}</span>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="auth__submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

        </form>

        {/* links to login page */}
        <p className="auth__link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register
