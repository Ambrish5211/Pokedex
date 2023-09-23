import { useState } from 'react'
import Pokedex from './Components/Pokedex/Pokedex'
import './App.css'
import Search from './Components/Search/Search'
import { Router, Route, Routes } from 'react-router-dom'
import PokemonDetails from './Components/PokemonDetails/PokemonDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Pokedex/>}></Route>
      <Route path="/pokemon/:id" element={<PokemonDetails/>}></Route>
      <Route path="*" element={<h1>Error 404! Path not found</h1> }></Route>
    </Routes>
  )
}

export default App
