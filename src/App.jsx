// Root component of the application.
// Renders the Navbar on every page 
// Defines all routes.

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddItem from './pages/AddItem'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      {/* Navbar sits outside Routes so it appears on every page */}
      <Navbar />

      <Routes>

        {/* default route */}
        <Route path="/"            element={<Home />} />
        {/* home page */}
        <Route path="/home"        element={<Home />} />
        {/* browse page */}
        <Route path="/list"        element={<List />} />
        {/* details page */}
        <Route path="/details/:id" element={<Details />} />
        {/* add movie form — requires login */}
        <Route path="/add"         element={<AddItem />} />
        {/* login page */}
        <Route path="/login"       element={<Login />} />
        {/* register page */}
        <Route path="/register"    element={<Register />} />

      </Routes>
    </>
  )
}

export default App