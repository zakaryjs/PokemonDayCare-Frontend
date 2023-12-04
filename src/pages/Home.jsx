import '../App.css'
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import Button from 'react-bootstrap/Button';
import { CFooter } from '@coreui/react';
import BackgroundParticles from '../components/BackgroundParticles';

export default function Home() {


    return (
        <>
            <BackgroundParticles />
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            <div className='margin-top-extra jumbo-text'>
                <span className='margin-top-extra'>The </span>
                <span className='margin-top-extra green-text'>best daycare </span>
                <span className='margin-top-extra'>in the region!</span>
            </div>
            <div className='margin-top jumbo-text'>
                <span className='margin-top'>We provide services that </span>
                <span className='margin-top green-text'>fit all trainers </span>
                <span className='margin-top'>needs:</span>
            </div>
            <div className='margin-top jumbo-text'>
                <span className='margin-top green-text'>Real-world </span>
                <span className='margin-top'>experience gain</span>
            </div>
            <div className='margin-top jumbo-text'>
                <span className='margin-top green-text'>Specialised </span>
                <span className='margin-top'>competitive training</span>
            </div>
            <div className='margin-top jumbo-text'>
                <span className='margin-top green-text'>1/4000 </span>
                <span className='margin-top'>-- breeding services</span>
            </div>
            <div className='text-center margin-top-extra'>
                <Button href="/about" variant='success'>About</Button>
            </div>
            <div className='text-center margin-top-button'>
                <Button href="/register" variant='success'>Register</Button>
            </div>
            <div className='text-center margin-top-button'>
                <Button href="/login" variant='success'>Login</Button>
            </div>
            <div className='image margin-top-extra'>
                <img src={require('../images/143926_1.png')} alt='smiling Chansey' height={157} width={182} />
            </div>
            <CFooter className='fixed-bottom centred'>
            <div>
                <span>&copy; 2023 Zakary Sutherland</span>
            </div>
            </CFooter>
        </>
    )
}