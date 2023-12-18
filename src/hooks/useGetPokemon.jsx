import { useState } from "react";
import { useRefresh } from "./UseRefresh";


export function useGetPokemon() {

    let { id, user } = useRefresh()
    const [pokemon, setPokemon] = useState({})
    
    async function GetPokemon() {
        if (id != null && user.isAdmin === true) {
            let result = await fetch(
                process.env.REACT_APP_ALL_POKEMON,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
            let data = await result.json()
            setPokemon(data.pokemon)
        }
        if (id != null && user.isAdmin === false) {
            let result = await fetch(
                process.env.REACT_APP_POKEMON_BY_ID + id,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
            let data = await result.json()
            setPokemon(data.pokemon)
        }
    }

    return { pokemon, GetPokemon }
}