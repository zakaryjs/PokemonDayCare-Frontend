import '../App.css'
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import Button from 'react-bootstrap/Button';

export default function Home() {


    return (
        <>
            <div id='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            <p className='margin-top'>The best daycare in the region!</p>
            <p className='margin-top'>We provide services that fit all trainers needs:</p>
            <ul>
                <li className='margin-top'>Real-world experience gain</li>
                <li className='margin-top'>Specialised competitive training</li>
                <li className='margin-top'>1/4000 -- breeding services</li>
            </ul>
            <div className='text-center margin-top'>
                <Button href="/about" variant='success'>About</Button>
            </div>
            <div className='text-center margin-top'>
                <Button href="/register" variant='success'>Register</Button>
            </div>
            <div className='text-center margin-top'>
                <Button href="/login" variant='success'>Login</Button>
            </div>
            <p>Copyright</p>
        </>
    )
}