// Root component.
// Renders the Navbar on every page and defines all routes.

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddItem from './pages/AddItem'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/home"        element={<Home />} />
        <Route path="/list"        element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/add"         element={<AddItem />} />
      </Routes>
    </>
  )
}

export default App