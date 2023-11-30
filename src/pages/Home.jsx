import '../App.css'
import NavBar from '../components/NavBar'
import '../styles/Home.css'

export default function Home() {


    return (
        <>
            <div id='image'>
                <img src={require('../images/Zak-Logo-BG-removed.png')} alt='logo' height={180} width={320} />
            </div>
            <NavBar />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium efficitur volutpat. Mauris sollicitudin vitae ex sed rhoncus. Suspendisse potenti. Etiam eleifend, libero rhoncus finibus pulvinar, ipsum arcu lobortis est, eget laoreet orci lectus cursus odio. Suspendisse malesuada vestibulum est, non commodo mauris convallis non. </p>
            <p>Button 1 placeholder</p>
            <p>Button 2 placeholder</p>
            <p>Button 3 placeholder</p>
            <p>Copyright</p>
        </>
    )
}