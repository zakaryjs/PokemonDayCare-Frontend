import { useState } from 'react';
import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import '../styles/Login.css'


export default function Login() {

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const togglePassword = (event) => {
        event.preventDefault()
        setPasswordVisibility(!passwordVisibility)
    }
    

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
                    <input type='text' id='email-address-login-input' />
                </div>
                <div>
                    <label>Password</label>
                    {passwordVisibility && <FaRegEye className='margin-left' onClick={togglePassword} /> }
                    {!passwordVisibility && <FaRegEyeSlash className='margin-left' onClick={togglePassword} /> }
                </div>
                <div>
                    <input type={passwordVisibility ? 'text' : 'password'} id='password-login-input' />
                </div>
                <Button className='margin-top-button' variant='success'>Submit</Button>
            </form>
        </>
    )
}