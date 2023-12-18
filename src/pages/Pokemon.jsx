import { useEffect, useState } from "react";
import BackgroundParticles from "../components/BackgroundParticles";
import HeaderImage from "../components/HeaderImage";
import NavBar from "../components/NavBar";
import { useRefresh } from "../hooks/UseRefresh";
import LoadingCircles from "../components/spinners/Circles";
import Footer from "../components/Footer";
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

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (id != null && user.isAdmin === true) {
            GetPokemon()
        }
        if (id != null && user.isAdmin === false) {
            GetPokemon()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemon])

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
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
        <Footer />
        </>
    )
}