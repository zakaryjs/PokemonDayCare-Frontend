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
            <div className='image margin-top-extra'>
                <img src={require('../images/Day_Care_Unova.png')} alt='daycare' height={180} width={320} />
            </div>
        </>
    )
}