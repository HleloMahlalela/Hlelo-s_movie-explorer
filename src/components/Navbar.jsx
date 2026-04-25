// Navigation bar shown on every page.

import { Link } from "react-router-dom"
import '../styles/navbar.css' //style import from navbar.css

function Navbar() {
  return (
    <nav className="navbar">

      {/*On click takes user to home*/}
      <Link className="navbar__brand" to="/home">
        Mosh&Chill
      </Link>

      {/*Navigation links*/}
      <ul className="navbar__links">
        <li> 
          <Link to="/home">Home</Link>
          </li>
        <li> 
          <Link to="/list">Browse</Link>
        </li>
        <li> 
          <Link to="/add">Add Movie</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar