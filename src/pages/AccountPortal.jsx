import { useEffect, useState } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function AccountPortal() {

    const [accountStatus, setAccountStatus] = useState("")
    const [user, setUser] = useState(null)
    const [info, setInfo] = useState(null)
    const navigate = useNavigate()

    let myDate = new Date()
    let hours = myDate.getHours()
    let welcome

    if (hours < 12)
        welcome = "morning"
    else if (hours >= 12 && hours <= 17)
        welcome = "afternoon"
    else if (hours >= 17 && hours <= 24)
        welcome = "evening"


    useEffect(() => {
        refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(accountStatus)
    }, [accountStatus])

    useEffect(() => {
        async function getUserInfo() {
            if (user && user.userID) {
                let userID = user?.userID     
                let result = await fetch(`${process.env.REACT_APP_BACKEND_BASE}${userID}`)
    
                let data = await result.json()
                setInfo(data)
                // console.log('user info', data)
                return data
            }
        }
        getUserInfo()
    }, [user])


    async function refresh() {

        try {
            let result = await fetch(
                process.env.REACT_APP_BACKEND_REFRESH,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({}),
                }
            )
        
            let data = await result.json()
            // console.log('validation', data)
    
            if (data.error) {
                console.log(data.error)
            } if (data.isAdmin) {
                console.log('verified as admin')
                setAccountStatus({admin: true})
                setUser(data.user)
                return
            } if (data.user) {
                console.log('verified as regular user')
                setAccountStatus({admin: false})
                setUser(data.user)
                return
            } else {
                navigate('/login')
            }
    
            return data
        } catch (error) {}
    }

    async function logout() {
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
        navigate('/')
        return data
    }

    if (info?.firstName) {
        return (
        <>
            <BackgroundParticles />
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
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
                <Button onClick={() => {logout()}} className='margin-top-button centred' variant='success'>Logout</Button>
            </div>
        </>
    )

} else {
    return (
        <>
            <BackgroundParticles />
                <div className='image'>
                    <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
                </div>
                <NavBar />
        </>
    )
}
}