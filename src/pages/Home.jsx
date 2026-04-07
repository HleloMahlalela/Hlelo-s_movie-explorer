// Landing page of the app.

import { useNavigate } from "react-router-dom"
import '../styles/home.css'

function Home() {

  //lets buttons change route
  const navigate = useNavigate()

  return (
    <div className="home">
      {/*app title*/}
      <h1 className="home__title">{/*Add icon Hlelo*/}Mosh&Chill</h1>

      <p className="home__description">
        Browse thousands of movies,search by title, 
        filter by genre and keep track of your favourites 
      </p>

      <div className="home__buttons">

        {/*takes user to browser*/}
        <button className="home__btn-primary"
        onClick={()=> navigate('/list')}> 
          Browse Movies
        </button>

        {/*Takes user to add movie form*/}
        <button className="home__btn-secondary"
        onClick={()=> navigate('/add')}>
          Add a Movie
        </button>
      </div>
    </div>
  )
}

export default Home