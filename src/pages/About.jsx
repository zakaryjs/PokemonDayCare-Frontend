import BackgroundParticles from '../components/BackgroundParticles';
import NavBar from '../components/NavBar';
import '../styles/About.css'


export default function About() {
    

    return (
        <>
        <BackgroundParticles />
            <div className='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            <div className='image margin-top-extra'>
                <img src={require('../images/Day_Care_Unova.png')} alt='daycare' height={180} width={320} />
            </div>
            <div>
                <p className='margin-top p-margins'>The lovely Pokemon Day Care has been running for many years.</p>
                <p className='margin-top p-margins'>Both Grant and Martha have enjoyed every year they have
                spent servicing the community through caring for
                Pokemon.
                </p>
            </div>
        </>
    )
}