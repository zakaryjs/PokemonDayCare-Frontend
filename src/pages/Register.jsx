import '../App.css'
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import Button from 'react-bootstrap/Button';
import { CFooter } from '@coreui/react';
import BackgroundParticles from '../components/BackgroundParticles';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { register } from '../functions/register';

export default function Register() {

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const togglePassword = (event) => {
        event.preventDefault()
        setPasswordVisibility(!passwordVisibility)
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
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
                    <label>First Name</label>
                </div>
                <div>
                    <input type='text' id='first-name-register-input' onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div>
                    <label>Last Name</label>
                </div>
                <div>
                    <input type='text' id='last-name-register-input' onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div>
                    <label>Email Address</label>
                </div>
                <div>
                    <input type='text' id='email-address-register-input' onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    {passwordVisibility && <FaRegEye className='margin-left' onClick={togglePassword} /> }
                    {!passwordVisibility && <FaRegEyeSlash className='margin-left' onClick={togglePassword} /> }
                </div>
                <div>
                    <input type={passwordVisibility ? 'text' : 'password'} id='password-register-input' onChange={(event) => setPassword(event.target.value)} />
                </div>
                <Button onClick={() => {register(firstName, lastName, email, password)}} className='margin-top-button' variant='success'>Submit</Button>
            </form>
            <CFooter className='fixed-bottom centred margin-top'>
            <div>
                <span>&copy; 2023 Zakary Sutherland</span>
            </div>
            </CFooter>
        </>
    )
}