import { useEffect, useState } from "react";
import BackgroundParticles from "../components/BackgroundParticles";
import Footer from "../components/Footer";
import HeaderImage from "../components/HeaderImage";
import NavBar from "../components/NavBar";
import { useRefresh } from "../hooks/UseRefresh";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LoadingGrid from "../components/spinners/Grid";

dayjs.extend(utc);

export default function CreateAppointment() {

    const [pokemon, setPokemon] = useState({})
    const [pokemonToSubmit, setPokemonToSubmit] = useState('')
    const [formattedPokemon, setFormattedPokemon] = useState('')
    const { refresh, user } = useRefresh();
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [dropOffDate, setDropOffDate] = useState(null)
    const [dropOffDateToSubmit, setDropOffDateToSubmit] = useState('2023-12-31T16:00:00.000Z')

    const [pickUpDate, setPickUpDate] = useState(null)
    const [pickUpDateToSubmit, setPickUpDateToSubmit] = useState('2023-12-31T16:00:00.000Z')

    const [typeOfAppointment, setTypeOfAppointment] = useState('Casual Care')

    const navigate = useNavigate()

    async function GetPokemon() {
        if (id != null && user.isAdmin === true) {
            let result = await fetch(process.env.REACT_APP_ALL_POKEMON)
            let data = await result.json()
            console.log(data)
            setPokemon(data)
        }
        if (id != null && user.isAdmin === false) {
            let result = await fetch(process.env.REACT_APP_POKEMON_BY_ID + id)
            let data = await result.json()
            // console.log(data)
            setPokemon(data.pokemon)
        }
    }

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (user != null) {
            // console.log(user)
            setId(user.userID)
        }
    }, [user])

    useEffect(() => {
        if (id != null && user.isAdmin === true) {
            console.log(`getting all pokemon`)
            GetPokemon()
        }
        if (id != null && user.isAdmin === false) {
            console.log(`getting users pokemon`)
            GetPokemon()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (pokemon[0]) {
            console.log(pokemon)
            setFormattedPokemon(pokemon[0]._id)
        }
    }, [pokemon])

    function handlePokemonChange(event) {
        setPokemonToSubmit(event.target.value)
    }

    function handleAppointmentTypeChange(event) {
        setTypeOfAppointment(event.target.value)
    }
    
    useEffect(() => {
        if (pokemonToSubmit[0]) {
            // console.log(pokemonToSubmit)
            // eslint-disable-next-line no-unused-vars
            let [newPoke, pokeId] = pokemonToSubmit.split("-")
            let trimmed = pokeId.trim()
            // console.log(pokeId)
            setFormattedPokemon(trimmed)
        }

    }, [pokemonToSubmit])

    useEffect(() => {
        if (dropOffDate != null) {
            console.log(dropOffDate['$d'])
            let formattedDropOffDate = Date.parse(dropOffDate['$d'])
            console.log(formattedDropOffDate)
            let formattedDropOffDateAsDate = new Date(formattedDropOffDate)
            console.log(formattedDropOffDateAsDate)
            console.log(formattedDropOffDateAsDate.toISOString())
            setDropOffDateToSubmit(formattedDropOffDateAsDate.toISOString())
        }
    }, [dropOffDate])

    useEffect(() => {
        if (pickUpDate != null) {
            console.log(pickUpDate['$d'])
            let formattedPickUpDate = Date.parse(pickUpDate['$d'])
            console.log(formattedPickUpDate)
            let formattedPickUpDateAsDate = new Date(formattedPickUpDate)
            console.log(formattedPickUpDateAsDate)
            console.log(formattedPickUpDateAsDate.toISOString())
            setPickUpDateToSubmit(formattedPickUpDateAsDate.toISOString())
        }
    }, [pickUpDate])

    async function SubmitAppointment(dropOffDate, pickUpDate, typeOfAppointment, pokemon, user) {
        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_APPOINTMENT_BY_ID,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({dropOffDate: dropOffDate, pickUpDate: pickUpDate, typeOfAppointment: typeOfAppointment, pokemon: pokemon, user: user}),
            }
        )

        let data = await result.json()
        
        if (!data.message) {
            setLoading(false)
            setId('')
            navigate('/appointments')
        }
    }

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
            <form className="centred">
                <div>
                    <label>Drop off Date</label>
                </div>
                <div>
                    <DatePicker  defaultValue={dayjs('2023-12-31')} timezone="UTC" onChange={(newValue => setDropOffDate(newValue))}/>
                </div>
                <div>
                    <label>Pick Up Date</label>
                </div>
                <div>
                    <DatePicker defaultValue={dayjs('2023-12-31')} timezone="UTC" onChange={(newValue => setPickUpDate(newValue))}/>
                </div>
                <div>
                    <label>Type of Appointment</label>
                </div>
                <div>
                    <select onChange={handleAppointmentTypeChange}>
                        <option>Casual Care</option>
                        <option>Competitive Training</option>
                        <option>Breeding</option>
                    </select>
                </div>
                <div>
                    <label>Pokemon</label>
                </div>
                <div>
                    {pokemon[0] && 
                    <select onChange={handlePokemonChange}>
                        {pokemon.map(pokemon => (
                            <option key={pokemon._id}>{pokemon.nickname} - {pokemon._id}</option>
                        ))}
                    </select>}
                </div>
                <div className='text-center margin-top-button'>
                    {!loading && <Button className='margin-top-button' variant='success' onClick={() => {SubmitAppointment(dropOffDateToSubmit, pickUpDateToSubmit, typeOfAppointment, formattedPokemon, id)}}>Create</Button>}
                </div>
            </form>
            <div className='container margin-top-extra'>
            {loading && <LoadingGrid />}
            </div>
            <Footer />
        </>
    )
}