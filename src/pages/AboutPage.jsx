import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div>
            <h1>About</h1>
            <p>This is a Pokédex built with React and Vite</p>
            <Link to="/">Back to Pokédex</Link>
        </div>
    );
}