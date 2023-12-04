import { useState } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../styles/Login.css'
import { login } from '../functions/login';


export default function Login() {

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const togglePassword = (event) => {
        event.preventDefault()
        setPasswordVisibility(!passwordVisibility)
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    

    return (
        <>
            <BackgroundParticles />
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            <form className='centred margin-top-extra'>
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
                <Button onClick={() => {login(email, password)}} className='margin-top-button' variant='success'>Submit</Button>
            </form>
        </>
    )
}