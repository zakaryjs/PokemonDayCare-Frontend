import '../App.css'
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import Button from 'react-bootstrap/Button';
import { CFooter } from '@coreui/react';
import BackgroundParticles from '../components/BackgroundParticles';

export default function Register() {


    return (
        <>
            <BackgroundParticles />
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            
            <CFooter className='fixed-bottom centred margin-top'>
            <div>
                <span>&copy; 2023 Zakary Sutherland</span>
            </div>
            </CFooter>
        </>
    )
}