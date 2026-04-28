// Navigation bar displayed on every page.

import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  const navigate = useNavigate()

  // check if the user is logged in by looking for a token
  const token = localStorage.getItem('token')
  const user  = JSON.parse(localStorage.getItem('user') || 'null')

  // called when the user clicks logout
  const handleLogout = () => {
    // removes the token and user from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // redirects to login page
    navigate('/login')
  }

  return (
    <nav className="navbar">

      {/* app brand */}
      <Link className="navbar__brand" to="/home">
        Mosh&Chill
      </Link>

      {/* navigation links */}
      <ul className="navbar__links">

        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/list">Browse</Link>
        </li>

        {/* only show Add Movie if logged in */}
        {token && (
          <li>
            <Link to="/add">Add Movie</Link>
          </li>
        )}

        {/* show Login and Register if logged out */}
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {/* show username and logout if logged in */}
        {token && (
          <>
            <li style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Hi, {user?.username}
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

    </nav>
  )
}

export default Navbar