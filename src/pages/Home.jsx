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
            <p className='margin-top'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium efficitur volutpat. Mauris sollicitudin vitae ex sed rhoncus. Suspendisse potenti. Etiam eleifend, libero rhoncus finibus pulvinar, ipsum arcu lobortis est, eget laoreet orci lectus cursus odio. Suspendisse malesuada vestibulum est, non commodo mauris convallis non. </p>
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