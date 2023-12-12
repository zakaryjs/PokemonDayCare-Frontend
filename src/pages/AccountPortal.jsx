import { useEffect, useState } from 'react';
import { getTime } from '../functions/getTime';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import LoadingCircles from '../components/spinners/Circles';
import LoadingGrid from '../components/spinners/Grid';
import '../styles/AccountPortal.css'
import {useRefresh} from '../hooks/UseRefresh';
import Footer from '../components/Footer';
import HeaderImage from '../components/HeaderImage';

export default function AccountPortal() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { refresh, accountStatus, user, info, loggedIn } = useRefresh();

    const welcome = getTime()

    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (loggedIn) {
            return
        } else {
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    async function logout() {
        setLoading(true)
        let result = await fetch(
            process.env.REACT_APP_BACKEND_LOGOUT,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        )
    
        let data = await result.json()
        // console.log(data)
        setLoading(false)
        navigate('/')
        return data
    }

        return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
            {info?.firstName && (
                <>
                    {accountStatus.admin && <p>Admin: TRUE</p>}
                    <p className='margin-top-extra'>Account ID: {user.userID}</p>
                    {info && <p>Good {welcome}, {info.firstName}!</p>}
                    <div className='text-center margin-top-button'>
                        <Button href="/pokemon" variant='success'>View Pokemon</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/createpokemon" variant='success'>Create Pokemon</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/appointments" variant='success' disabled>View Appointments</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/createappointment" variant='success' disabled>Create Appointment</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        {!loading && <Button onClick={() => {logout()}} className='margin-top-button centred' variant='success'>Logout</Button>}
                        <div className='container margin-top-extra'>
                            {loading && <LoadingGrid />}
                        </div>
                    </div>
            </>
            )}
            {!info?.firstName && (
                <div className='container margin-top-extra'>
                    <LoadingCircles />
                </div>
            )}
            <Footer />
        </>
    )

}