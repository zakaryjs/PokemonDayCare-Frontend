import { useEffect } from 'react';
import { getTime } from '../functions/getTime';
import Button from 'react-bootstrap/Button';
import LoadingCircles from '../components/spinners/Circles';
import LoadingGrid from '../components/spinners/Grid';
import '../styles/AccountPortal.css'
import {useRefresh} from '../hooks/UseRefresh';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

export default function AccountPortal() {

    const { refresh, accountStatus, user, info, loggedIn } = useRefresh();
    const { loading, logout } = useLogout();
    const welcome = getTime()
    const navigate = useNavigate()

    // on load, run the refresh
    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if the user is logged in, continue. if they are not, redirect to the login page
    useEffect(() => {
        if (loggedIn) {
            return
        } else {
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

        return (
        <>
        {/* logged in? show the following */}
            {info?.firstName && (
                <>
                    {/* if admin, show admin: true */}
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
                        <Button href='/updatepokemon' variant='success'>Update Pokemon</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/appointments" variant='success'>View Appointments</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/createappointment" variant='success'>Create Appointment</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        {!loading && <Button onClick={() => {logout()}} className='margin-top-button centred' variant='success'>Logout</Button>}
                        {/* while loading logout, show this spinner */}
                        <div className='container margin-top-extra'>
                            {loading && <LoadingGrid />}
                        </div>
                    </div>
            </>
            )}
            {/* on initial load, show this spinner */}
            {!info?.firstName && (
                <div className='container margin-top-extra'>
                    <LoadingCircles />
                </div>
            )}
        </>
    )
}