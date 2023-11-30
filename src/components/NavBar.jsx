import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <>
            <li>
                <Link to="">Home</Link>
                <Link to="About">About</Link>
                <Link to="Portal">Portal</Link>
            </li>
        
        </>
    )
}