import { useState } from 'react'
import Pokedex from './Components/Pokedex/Pokedex'
import './App.css'
import Search from './Components/Search/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pokedex/>
    </>
  )
}

export default App
