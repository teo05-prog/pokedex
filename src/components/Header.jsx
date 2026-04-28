import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo">
                    <img src="public/download%20(1).png" alt="Pokedex" className="logo-icon" />
                    <span className="logo-text">Pokédex</span>
                </Link>
            </div>
            <nav className="header-nav">
                <Link to="/" className="nav-link">Pokédex</Link>
                <Link to="/about" className="nav-link">About</Link>
            </nav>
        </header>
    );
}
