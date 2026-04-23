import { Link } from 'react-router-dom';

export default function PokedexPage() {
    return (
        <div>
            <h1>Pokédex</h1>
            <p>Pokémon list will go here</p>
            <Link to="/about">About</Link>
        </div>
    );
}