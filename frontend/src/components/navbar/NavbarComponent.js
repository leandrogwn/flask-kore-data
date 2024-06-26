import { Link } from 'react-router-dom';

import './NavbarComponent.css';

function NavbarComponent() {
    return (

        <nav className="navbar">
            <h2>
                <Link to="/">Kore Data</Link>
            </h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/usuarios" className="new-btn">Usuários</Link></li>
            </ul>
        </nav>

    )
}

export default NavbarComponent