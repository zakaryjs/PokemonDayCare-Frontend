import { useEffect, useState } from "react";
import BackgroundParticles from "../components/BackgroundParticles";
import Footer from "../components/Footer";
import HeaderImage from "../components/HeaderImage";
import NavBar from "../components/NavBar";
import { useRefresh } from "../hooks/UseRefresh";
import LoadingCircles from "../components/spinners/Circles";
import { FaTrash } from "react-icons/fa";
import { useGetAppointment } from "../hooks/useGetAppointment";
import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

export default function ViewAppointments() {

    const { refresh, user, accountStatus, id } = useRefresh();
    const { appointments, GetAppointment } = useGetAppointment()
    const { DeleteAppointment } = useDeleteAppointment()
    const [updatedAppointments, setUpdatedAppointment] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (id != null && user.isAdmin === true) {
            GetAppointment()
        }
        if (id != null && user.isAdmin === false) {
            GetAppointment()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (appointments.appointments) {
            const pokemonSprites = appointments?.appointments.map(appointment => {
                if (appointment.pokemon) {
                    let pokemonName = appointment.pokemon.species.toLowerCase()
                    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(response => response.json()).then(data => {
                    const spriteUrl = data.sprites.front_default
                    const dropOffDate = appointment.dropOffDate
                    const [splitDropOffDate] = dropOffDate.split("T")
                    const [splitDropOffYear, splitDropOffMonth, splitDropOffDays] = splitDropOffDate.split("-")
                    const pickUpDate = appointment.pickUpDate
                    const [splitPickUpDate] = pickUpDate.split("T")
                    const [splitPickUpYear, splitPickUpMonth, splitPickUpDays] = splitPickUpDate.split("-")
                    return {...appointment, spriteUrl, splitDropOffYear, splitDropOffMonth, splitDropOffDays, splitPickUpYear, splitPickUpMonth, splitPickUpDays}
                })
                } else {
                    const spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'
                    const dropOffDate = appointment.dropOffDate
                    const [splitDropOffDate] = dropOffDate.split("T")
                    const [splitDropOffYear, splitDropOffMonth, splitDropOffDays] = splitDropOffDate.split("-")
                    const pickUpDate = appointment.pickUpDate
                    const [splitPickUpDate] = pickUpDate.split("T")
                    const [splitPickUpYear, splitPickUpMonth, splitPickUpDays] = splitPickUpDate.split("-")
                    return {...appointment, spriteUrl, splitDropOffYear, splitDropOffMonth, splitDropOffDays, splitPickUpYear, splitPickUpMonth, splitPickUpDays}
                }   
            })
            Promise.all(pokemonSprites).then(updatedAppointmentList => {
                console.log(updatedAppointmentList)
                setUpdatedAppointment(updatedAppointmentList)
                setLoading(false)
            })
        }
    }, [appointments])

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
            {accountStatus.admin && <p>Admin: TRUE</p>}
            {!loading && !accountStatus.admin && <p>Viewing Appointments for {user.userID}</p>}
            {loading && (
                <div className='container margin-top-extra'>
                    <LoadingCircles />
                </div>
            )}
            {!loading && updatedAppointments[0] && updatedAppointments.map(day => (
                <div className="centred pokemon-box" key={day._id}>
                    <img src={day.spriteUrl} height={125} width={125} alt={'poke'} />
                    <h2>Appointment Details:</h2>
                    <h3>Drop off Date: {day.splitDropOffDays} {day.splitDropOffMonth} {day.splitDropOffYear}</h3>
                    <h3>Pickup Date: {day.splitPickUpDays} {day.splitPickUpMonth} {day.splitPickUpYear}</h3>
                    <h3>Pokemon: {day?.pokemon?.nickname}</h3>
                    <h3>Species: {day?.pokemon?.species}</h3>
                    <h3>Type of Appointment: {day.typeOfAppointment}</h3>
                    {accountStatus.admin && <h3>{day.user.email}</h3>}
                    <FaTrash onClick={() => {DeleteAppointment(day._id)}}/>
                </div>
            ))}
            <Footer />
        </>
    )
}