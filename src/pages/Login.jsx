// Login page where existing users sign in.
// On successful login the JWT token is saved to localStorage
// and the user is redirected to the home page.
// Styles are imported from auth.css.

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authApi'
import '../styles/auth.css'

function Login() {
  // one state variable per form field
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  // stores validation errors per field
  const [errors, setErrors] = useState({})

  // stores server error message if login fails
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
    if (!email.trim()) newErrors.email    = 'Email is required.'
    if (!password)     newErrors.password = 'Password is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // sends login request to the backend
    setLoading(true)
    const data = await loginUser(email, password)
    setLoading(false)

    if (data.token) {
      // saves the token and user to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // redirects to home page
      navigate('/home')
    } else {
      // show error message from server
      setServerError(data.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">

        {/* page title */}
        <h2 className="auth__title">Welcome Back</h2>
        <p className="auth__subtitle">Login to your Mosh&Chill account</p>

        {/* server error banner */}
        {serverError && (
          <div className="auth__server-error">{serverError}</div>
        )}

        <form className="auth__form" onSubmit={handleSubmit}>

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
              placeholder="your password"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* link to register page */}
        <p className="auth__link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login