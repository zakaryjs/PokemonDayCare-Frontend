import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';


export default function About() {
    

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