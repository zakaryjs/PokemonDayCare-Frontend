import '../App.css'
import '../styles/Home.css'
import Button from 'react-bootstrap/Button';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGrid from '../components/spinners/Grid';
import { usePasswordToggle } from '../hooks/usePasswordToggle';

export default function Register() {

    const navigate = useNavigate()
    const { passwordVisibility, togglePassword } = usePasswordToggle()
    const [loading, setLoading] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    // fetch request to register a user
    async function register(firstName, lastName, email, password) {
        setLoading(true)

        let result = await fetch(
            process.env.REACT_APP_BACKEND_REGISTER,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({firstName: firstName, lastName: lastName, password: password, email: email}),
            }
        )
    
        // if a user was successfully created, redirect them to the login screen
        let data = await result.json()
    
        if (data.user) {
            setLoading(false)
            navigate('/login')
        // else, show the error to the user
        } if (data.error) {
            setLoading(false)
            setError(data.error)
        }
        return data
    }

    return (
        <>
            <h1 className='margin-top'>Register</h1>
            <form className='centred margin-top'>
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
                {!loading && <Button onClick={() => {register(firstName, lastName, email, password)}} className='margin-top-button' variant='success'>Submit</Button>}
            </form>
            <div className='container margin-top-extra'>
            {loading && <LoadingGrid />}
            </div>
            {error?.errors?.firstName && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.firstName?.message}`}</p>}
            {error?.errors?.lastName && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.lastName?.message}`}</p>}
            {error?.errors?.email && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errors?.email?.message}`}</p>}
            {error?.errorMessage && <p style={{color: 'red', marginTop: '15px'}}>{`Error: ${error?.errorMessage}`}</p>}
        </>
    )
}