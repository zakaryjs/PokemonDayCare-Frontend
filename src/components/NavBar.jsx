import { NavLink } from "react-router-dom";
import '../styles/NavBar.css'


export default function NavBar() {
    return (
        <>
            <li id="navbar-list">
                <NavLink to="/" className={({isActive}) => isActive ? 'styledSelected' : 'styled'}>Home</NavLink>
                <NavLink to="/About" className={({isActive}) => isActive ? 'styledSelected' : 'styled'}>About</NavLink>
                <NavLink to="/Portal" className={({isActive}) => isActive ? 'styledSelected' : 'styled'}>Portal</NavLink>
            </li>
        </>
    )
}