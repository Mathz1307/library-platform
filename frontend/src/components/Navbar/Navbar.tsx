import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <h1>jekLibrary</h1>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/add-book">Add Book</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;