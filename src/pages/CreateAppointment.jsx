import { useEffect, useState } from "react";
import { useRefresh } from "../hooks/UseRefresh";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LoadingGrid from "../components/spinners/Grid";
import { useGetPokemon } from "../hooks/useGetPokemon";

dayjs.extend(utc);

export default function CreateAppointment() {

    const { pokemon, GetPokemon } = useGetPokemon()
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
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    // on load, run the refresh
    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if there is a user logged in, set ID to the user ID
    useEffect(() => {
        if (user != null) {
            setId(user.userID)
        }
    }, [user])

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

    // if there is a pokemon, set the initial ID to that pokemon
    useEffect(() => {
        if (pokemon[0]) {
            setFormattedPokemon(pokemon[0]._id)
        }
    }, [pokemon])

    // every time the form changes, set the submission pokemon to that value
    function handlePokemonChange(event) {
        setPokemonToSubmit(event.target.value)
    }

    // every time the form changes, set the submission type of appointment to that value
    function handleAppointmentTypeChange(event) {
        setTypeOfAppointment(event.target.value)
    }
    
    // if theres a pokemon to submit, set the formatted pokemon to that pokemons ID
    useEffect(() => {
        if (pokemonToSubmit[0]) {
            // eslint-disable-next-line no-unused-vars
            let [newPoke, pokeId] = pokemonToSubmit.split("-")
            let trimmed = pokeId.trim()
            setFormattedPokemon(trimmed)
        }

    }, [pokemonToSubmit])

    // set the drop off date to a formatted version of the selected date
    useEffect(() => {
        if (dropOffDate != null) {
            let formattedDropOffDate = Date.parse(dropOffDate['$d'])
            let formattedDropOffDateAsDate = new Date(formattedDropOffDate)
            setDropOffDateToSubmit(formattedDropOffDateAsDate.toISOString())
        }
    }, [dropOffDate])

    // set the pick up date to a formatted version of the selected date
    useEffect(() => {
        if (pickUpDate != null) {
            let formattedPickUpDate = Date.parse(pickUpDate['$d'])
            let formattedPickUpDateAsDate = new Date(formattedPickUpDate)
            setPickUpDateToSubmit(formattedPickUpDateAsDate.toISOString())
        }
    }, [pickUpDate])

    // fetch request to submit the created appointment
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

        if (data.error) {
            setLoading(false)
            setError(data.error)
        } else if (!data.message) {
            setLoading(false)
            setId('')
            navigate('/appointments')
        }
    }

    return (
        <>
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
            {error?.errors?.dropOffDate && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.dropOffDate?.message}`}</p>}
            {error?.errors?.gender && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.gender?.message}`}</p>}
            {error?.errors?.typeOfAppointment && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.typeOfAppointment?.message}`}</p>}
            {error?.errors?.pokemon && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.pokemon?.message}`}</p>}
        </>
    )
}