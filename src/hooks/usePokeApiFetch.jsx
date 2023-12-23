import { useState } from "react";


//@desc hook to fetch all pokemon on page load
// save the fetched pokemon to state
// return function and state

export function usePokeApiFetch() {
    const [fetchedPokemon, setFetchedPokemon] = useState({})

    async function getPokemon() {
        try {
            let result = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`)

            let data = await result.json()
            setFetchedPokemon(data.results)
            return data
        } catch (error) {}
        
    }

    return { fetchedPokemon, getPokemon };
}