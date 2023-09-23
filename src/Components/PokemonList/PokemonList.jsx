import './PokemonList.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon.jsx'

const PokemonList = () => {

    const [pokemonList, setpokemonList] = useState([])
    const POKEDOX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadPokemon () {
        const response = await axios.get(POKEDOX_URL);
        
        console.log( response.data)

        const pokemonResult = response.data.results;

        const pokemonPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        const pokemonListData = await axios.all(pokemonPromise);

        const pokemonFinalList = pokemonListData.map(pokemonData => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types:pokemon.types
            }
        })

        setpokemonList(pokemonFinalList);
        console.log(pokemonList)


    }

    useEffect(() => {
        downloadPokemon();
    }, [])

  return (
    <div className='pokemon-list-wrapper'>
        <div> <h1>Pokemon List</h1></div>

    

        <div className='pokemon-list'>
        {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)}
        </div>
    </div>
  )
}

export default PokemonList;