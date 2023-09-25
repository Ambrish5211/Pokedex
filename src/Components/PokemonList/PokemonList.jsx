import './PokemonList.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../Pokemon/Pokemon.jsx'

const PokemonList = () => {

    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    // const [pokemonList, setpokemonList] = useState([]);

    // const [pokedexUrl, setpokedexUrl] = useState(DEFAULT_URL)

    // const[nextUrl, setnextUrl] = useState(DEFAULT_URL)
    
    // const[prevUrl, setprevUrl] = useState(DEFAULT_URL)

    const[pokemonListState, setpokemonListState] = useState({
        pokedexUrl : DEFAULT_URL,
        nextUrl : DEFAULT_URL,
        prevUrl : DEFAULT_URL,
        pokemonList : []
    })

    async function downloadPokemon () {
        const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL);
        
        // setnextUrl(response.data.next);
        // setprevUrl(response.data.previous);

        setpokemonListState((state) => ({...state, nextUrl: response.data.next, prevUrl: response.data.previous}))

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

setpokemonListState((state) => ({state, pokemonList : pokemonFinalList}));
    


    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokedexUrl])

  return (
    <div className='pokemon-list-wrapper'>
        <div> <h1>Pokemon List</h1></div>
        <div className='page-controls'>
            <button onClick={() => setpokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})} >Prev</button>
            <button onClick={() => setpokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>

        </div>
    

        <div className='pokemon-list'>
        {pokemonListState.pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)}
        </div>
    </div>
  )
}

export default PokemonList;