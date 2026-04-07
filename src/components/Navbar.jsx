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
        <li to="/home">Home</li>
        <li to="/list">Browse</li>
        <li to="/add">Add Movie</li>
      </ul>
    </nav>
  )
}

export default Navbar