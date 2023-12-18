import { useState } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import LoadingGrid from '../components/spinners/Grid';
import Footer from '../components/Footer';
import HeaderImage from '../components/HeaderImage';
import { usePasswordToggle } from '../hooks/usePasswordToggle';

export default function Login() {

    const navigate = useNavigate()
    const { passwordVisibility, togglePassword } = usePasswordToggle()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function login(email, password) {
        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_BACKEND_LOGIN,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({email: email, password: password}),
            }
        )
    
        let data = await result.json()

        if (!data.message) {
            setLoading(false)
            navigate('/portal')
        } else {
            setLoading(false)
            setError(data.message)
        }
    
        return data
    }

    return (
        <>
            <BackgroundParticles />
            <HeaderImage />
            <NavBar />
            <h1 className='margin-top'>Login</h1>
            <form className='centred margin-top'>
                <div>
                    <label>Email Address</label>
                </div>
                <div>
                    <input type='text' id='email-address-login-input' onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    {passwordVisibility && <FaRegEye className='margin-left' onClick={togglePassword} /> }
                    {!passwordVisibility && <FaRegEyeSlash className='margin-left' onClick={togglePassword} /> }
                </div>
                <div>
                    <input type={passwordVisibility ? 'text' : 'password'} id='password-login-input' onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className='text-center margin-top-button'>
                    {!loading && <Button onClick={() => {login(email, password)}} className='margin-top-button' variant='success'>Submit</Button>}
                </div>
            </form>
            <div className='container margin-top-extra'>
            {loading && <LoadingGrid />}
            </div>
            {error && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error}`}</p>}
            <Footer />
        </>
    )
}