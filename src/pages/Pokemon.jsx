import { useEffect, useState } from "react";
import { useRefresh } from "../hooks/UseRefresh";
import LoadingCircles from "../components/spinners/Circles";
import '../styles/Card.css'
import { FaTrash } from "react-icons/fa";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { useDeletePokemon } from "../hooks/useDeletePokemon";

export default function ViewPokemon() {

    const { refresh, user, accountStatus, id } = useRefresh();
    const { pokemon, GetPokemon } = useGetPokemon();
    const { DeletePokemon } = useDeletePokemon()
    const [updatedPokemon, setUpdatedPokemon] = useState({})
    const [loading, setLoading] = useState(true)

    // on load, run the refresh
    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if there is an id, run the get pokemon function
    // result is different depending on admin status
    useEffect(() => {
        if (id != null && user.isAdmin === true) {
            GetPokemon()
        }
        if (id != null && user.isAdmin === false) {
            GetPokemon()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // if there are pokemon
    // make a new object for each array, which includes all relevant data as well as a pokemon sprite based on the species name
    useEffect(() => {
        if (pokemon[0]) {
            const pokemonSprites = pokemon.map(pokemon => {
                let pokemonName = pokemon.species.toLowerCase()
                return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(response => response.json()).then(data => {
                    const spriteUrl = data.sprites.front_default
                    return {...pokemon, spriteUrl}
                })
            })
            Promise.all(pokemonSprites).then(updatedPokemonList => {
                setUpdatedPokemon(updatedPokemonList)
                setLoading(false)
            })
        }
        if (!pokemon[0] && id != null) {
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemon])

    return (
        <>
            {accountStatus.admin && <p>Admin: TRUE</p>}
            {!loading && !accountStatus.admin && <p>Viewing Pokemon for {user.userID}</p>}
            {loading && (
                <div className='container margin-top-extra'>
                    <LoadingCircles />
                </div>
            )}
            {!loading && updatedPokemon[0] && updatedPokemon.map(day => (
                        <div className="centred pokemon-box" key={day.nickname}>
                        <FaTrash onClick={() => DeletePokemon(day._id)}/>
                        <h3>{day.species}</h3>
                        <h4>Nickname: {day.nickname}</h4>
                        <h4>Gender: {day.gender}</h4>
                        <h4>Weight: {day.weight}kg</h4>
                        <h4>Height: {day.height}cm</h4>
                        <h4>Notes: {day.notes}</h4>
                        <img src={day.spriteUrl} height={125} width={125} alt='egg' />
                        </div>
                    ))}
        </>
    )
}