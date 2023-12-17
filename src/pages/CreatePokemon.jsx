import { useEffect, useState } from "react";
import BackgroundParticles from "../components/BackgroundParticles";
import Footer from "../components/Footer";
import HeaderImage from "../components/HeaderImage";
import NavBar from "../components/NavBar";
import { Button } from "react-bootstrap";
import { useRefresh } from "../hooks/UseRefresh";
import { useNavigate } from "react-router-dom";
import LoadingGrid from "../components/spinners/Grid";
import { usePokeApiFetch } from "../hooks/usePokeApiFetch";

export default function CreatePokemon() {
    
    const [species, setSpecies] = useState("bulbasaur")
    const [nickname, setNickname] = useState("")
    const [gender, setGender] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [notes, setNotes] = useState("")

    const { refresh, user } = useRefresh();
    const { fetchedPokemon, getPokemon } = usePokeApiFetch()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        refresh()
        getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        if (user != null) {
            // console.log(user)
            setId(user.userID)
        }
    }, [user])

    async function createPokemon(species, nickname, gender, height, weight, notes, id) {
        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_POKEMON_BY_ID,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({species: species, nickname: nickname, gender: gender, height: height, weight: weight, notes: notes, user: id}),
            }
        )
    
        let data = await result.json()

        console.log(data)

        if (data.error) {
            setLoading(false)
            setError(data.error)
        } else if (!data.message) {
            setLoading(false)
            navigate('/pokemon')
        }

        

        // if (data.message) {
        //     setLoading(false)
        //     setError(data.message)
        // }
    
        return data
    }

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />

            <form className="centred margin-top">
                <div>
                    <label>Nickname</label>
                </div>
                <div>
                    <input type="text" id="species-create-input" onChange={(event) => setNickname(event.target.value)} />
                </div>
                <div>
                    <label>Species</label>
                </div>
                <div> 
                    {fetchedPokemon[0] && <select onChange={(event) => {setSpecies(event.target.value)}}>
                        {fetchedPokemon.map(pokemon => (
                            <option key={pokemon.name}>{pokemon.name}</option>
                        ))}
                        </select>}
                </div>
                <div>
                    <label>Gender</label>
                </div>
                <div>
                    <input type="text" id="gender-create-input" onChange={(event) => setGender(event.target.value)} />
                </div>
                <div>
                    <label>Height</label>
                </div>
                <div>
                    <input type="text" id="height-create-input" onChange={(event) => setHeight(event.target.value)} />
                </div>
                <div>
                    <label>Weight</label>
                </div>
                <div>
                    <input type="text" id="weight-create-input" onChange={(event) => setWeight(event.target.value)} />
                </div>
                <div>
                    <label>Notes</label>
                </div>
                <div>
                    <input type="text" id="notes-create-input" onChange={(event) => setNotes(event.target.value)} />
                </div>
                <div className='text-center margin-top-button'>
                    {!loading && <Button onClick={() => createPokemon(species, nickname, gender, height, weight, notes, id)} className='margin-top-button' variant='success'>Create</Button>}
                </div>
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