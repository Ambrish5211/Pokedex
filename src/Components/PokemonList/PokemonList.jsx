import './PokemonList.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const PokemonList = () => {

    const [pokemonList, setpokemonList] = useState([])
    const POKEDOX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadPokemon () {
        const response = await axios.get(POKEDOX_URL);
        
        console.log( response.data)

        const pokemonResults = response.data.results;

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


    }

    useEffect(() => {
        downloadPokemon();
    }, [])

  return (
    <div className='pokemon-list-wrapper'>
        
    </div>
  )
}

export default PokemonList;