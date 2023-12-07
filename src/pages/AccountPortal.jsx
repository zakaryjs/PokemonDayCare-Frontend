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

export default function AccountPortal() {

    // const [accountStatus, setAccountStatus] = useState("")
    // const [user, setUser] = useState(null)
    // const [info, setInfo] = useState(null)
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

    // useEffect(() => {
    //     getUserInfo()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user])

    // async function refresh() {
    //     try {
    //         let result = await fetch(
    //             process.env.REACT_APP_BACKEND_REFRESH,
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 credentials: "include",
    //                 body: JSON.stringify({}),
    //             }
    //         )
        
    //         let data = await result.json()
    //         // console.log('validation', data)
    
    //         if (data.error) {
    //             console.log(data.error)
    //         } if (data.isAdmin) {
    //             console.log('verified as admin')
    //             setAccountStatus({admin: true})
    //             setUser(data.user)
    //             return
    //         } if (data.user) {
    //             console.log('verified as regular user')
    //             setAccountStatus({admin: false})
    //             setUser(data.user)
    //             return
    //         } else {
    //             navigate('/login')
    //         }
    //         return data
    //     } catch (error) {}
    // }

    // async function getUserInfo() {
    //     if (user && user.userID) {
    //         let userID = user?.userID     
    //         let result = await fetch(`${process.env.REACT_APP_BACKEND_BASE}${userID}`)

    //         let data = await result.json()
    //         setInfo(data)
    //         // console.log('user info', data)
    //         return data
    //     }
    // }

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
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            {info?.firstName && (
                <>
                    {accountStatus.admin && <p>Admin: TRUE</p>}
                    <p className='margin-top-extra'>Account ID: {user.userID}</p>
                    {info && <p>Good {welcome}, {info.firstName}!</p>}
                    <div className='text-center margin-top-button'>
                        <Button href="/pokemon" variant='success' disabled>View Pokemon</Button>
                    </div>
                    <div className='text-center margin-top-button'>
                        <Button href="/createpokemon" variant='success' disabled>Create Pokemon</Button>
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
        </>
    )

}