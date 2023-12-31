import { useEffect, useState } from "react";
import { useRefresh } from "../hooks/UseRefresh";
import { Button } from "react-bootstrap";
import LoadingGrid from "../components/spinners/Grid";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { useUpdatePokemon } from "../hooks/useUpdatePokemon";

export default function UpdatePokemon() {

    const { pokemon, GetPokemon } = useGetPokemon();
    const { error, loading, editPokemon } = useUpdatePokemon()
    const [pokemonToSubmit, setPokemonToSubmit] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [formattedPokemon, setFormattedPokemon] = useState('')
    const [pokemonToModify, setPokemonToModify] = useState(null)
    const { refresh, user, id } = useRefresh();
    
    const [species, setSpecies] = useState("")
    const [nickname, setNickname] = useState("")
    const [gender, setGender] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [notes, setNotes] = useState("")

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

    // on load, set the pokemon to modify as the first that is fetched
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

    // when the value is changed, set the pokemon to that value
    function handlePokemonChange(event) {
        setPokemonToSubmit(event.target.value)
    }

    // format the pokemon so that only ID is stored in state
    useEffect(() => {
        if (pokemonToSubmit[0]) {
            // eslint-disable-next-line no-unused-vars
            let [newPoke, pokeId] = pokemonToSubmit.split("-")
            let trimmed = pokeId.trim()
            setFormattedPokemon(trimmed)
            setPokemonToModify(trimmed)
        }

    }, [pokemonToSubmit])

    // fetch request to get individual pokemon data
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

    // if the pokemonToModify is set, get the data about that pokemon
    useEffect(() => {
        if (pokemonToModify != null) {
            GetPokemonData(pokemonToModify)
        }
    }, [pokemonToModify])

    return (
        <>
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
        </>
    )
}