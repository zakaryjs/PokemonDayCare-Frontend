import { useEffect, useState } from "react";
import BackgroundParticles from "../components/BackgroundParticles";
import HeaderImage from "../components/HeaderImage";
import NavBar from "../components/NavBar";
import { useRefresh } from "../hooks/UseRefresh";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import LoadingGrid from "../components/spinners/Grid";
import { useNavigate } from "react-router-dom";
import { useGetPokemon } from "../hooks/useGetPokemon";

export default function UpdatePokemon() {

    const { pokemon, GetPokemon } = useGetPokemon();
    const [pokemonToSubmit, setPokemonToSubmit] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [formattedPokemon, setFormattedPokemon] = useState('')
    const [pokemonToModify, setPokemonToModify] = useState(null)
    const { refresh, user, id } = useRefresh();
    const [loading, setLoading] = useState(false)

    const [species, setSpecies] = useState("")
    const [nickname, setNickname] = useState("")
    const [gender, setGender] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

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
            setFormattedPokemon(pokemon[0]._id)
            setPokemonToModify(pokemon[0]._id)
            setNickname(pokemon[0].nickname)
            setSpecies(pokemon[0].species)
            setGender(pokemon[0].gender)
            setHeight(pokemon[0].height)
            setWeight(pokemon[0].weight)
            setNotes(pokemon[0].notes)
        }
    }, [pokemon])

    function handlePokemonChange(event) {
        setPokemonToSubmit(event.target.value)
    }

    useEffect(() => {
        if (pokemonToSubmit[0]) {
            // eslint-disable-next-line no-unused-vars
            let [newPoke, pokeId] = pokemonToSubmit.split("-")
            let trimmed = pokeId.trim()
            setFormattedPokemon(trimmed)
            setPokemonToModify(trimmed)
        }

    }, [pokemonToSubmit])

    async function GetPokemonData(pokemon) {
        let result = await fetch(
            process.env.REACT_APP_POKEMON_FIND + pokemon,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
        let data = await result.json()
        setNickname(data.pokemon[0].nickname)
        setSpecies(data.pokemon[0].species)
        setGender(data.pokemon[0].gender)
        setHeight(data.pokemon[0].height)
        setWeight(data.pokemon[0].weight)
        setNotes(data.pokemon[0].notes)
        return data
    }

    useEffect(() => {
        if (pokemonToModify != null) {
            GetPokemonData(pokemonToModify)
        }
    }, [pokemonToModify])

    async function editPokemon(species, nickname, gender, height, weight, notes, id, ptm) {

        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_POKEMON_BY_ID + ptm,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({species: species, nickname: nickname, gender: gender, height: height, weight: weight, notes: notes})
            }
        )

        let data = await result.json()
        console.log(data)

        setLoading(false)

        if (data.error) {
            setLoading(false)
            setError(data.error)
        } else {
            setLoading(false)
            navigate('/pokemon')
        }

        return data
    }

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
            <form className="centred margin-top">
                <div>
                    {pokemon[0] && 
                    <select onChange={handlePokemonChange}>
                        {pokemon.map(pokemon => (
                            <option key={pokemon._id}>{pokemon.nickname} - {pokemon._id}</option>
                        ))}
                    </select>}
                </div>
                <div>
                    <label>Nickname</label>
                </div>
                <div>
                    <input type="text" id="species-create-input" value={nickname} onChange={(event) => setNickname(event.target.value)} />
                </div>
                <div>
                    <label>Gender</label>
                </div>
                <div>
                    <input type="text" id="gender-create-input" value={gender} onChange={(event) => setGender(event.target.value)} />
                </div>
                <div>
                    <label>Height</label>
                </div>
                <div>
                    <input type="text" id="height-create-input" value={height} onChange={(event) => setHeight(event.target.value)} />
                </div>
                <div>
                    <label>Weight</label>
                </div>
                <div>
                    <input type="text" id="weight-create-input" value={weight} onChange={(event) => setWeight(event.target.value)} />
                </div>
                <div>
                    <label>Notes</label>
                </div>
                <div>
                    <input type="text" id="notes-create-input" value={notes} onChange={(event) => setNotes(event.target.value)} />
                </div>
                {!loading && <Button onClick={() => editPokemon(species, nickname, gender, height, weight, notes, id, pokemonToModify)} className='margin-top-button' variant='success'>Edit Pokemon</Button>}
            </form>
            <div className='container margin-top-extra'>
            {loading && <LoadingGrid />}
            </div>
            {error?.errors?.nickname && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.nickname?.message}`}</p>}
            {error?.errors?.gender && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.gender?.message}`}</p>}
            {error?.errors?.height && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.height?.message}`}</p>}
            {error?.errors?.weight && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.weight?.message}`}</p>}
            <Footer />
        </>
    )
}