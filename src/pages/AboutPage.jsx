import Header from '../components/Header';
import '../styles/AboutPage.css';

export default function AboutPage() {
    return (
        <div className="about-page-wrapper">
            <Header />
            <div className="about-content">
                <div className="detail-container">
                    <h2>About This Pokédex</h2>
                    <p>Welcome to the Pokédex! This web application allows you to explore and discover information about Pokémon from all generations.</p>

                    <h3>Features</h3>
                    <ul>
                        <li>Browse and explore thousands of Pokémon</li>
                        <li>Filter Pokémon by type</li>
                        <li>View detailed information about each Pokémon including stats, abilities, height, and weight</li>
                        <li>Smooth pagination for easy navigation</li>
                        <li>Responsive design that works on all devices</li>
                    </ul>

                    <h3>About the API</h3>
                    <p>This Pokédex uses the PokéAPI, a free and open-source API that provides information about Pokémon. Visit <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">pokeapi.co</a> for more information.</p>

                    <h3>Technologies Used</h3>
                    <ul>
                        <li>React - JavaScript library for building user interfaces</li>
                        <li>React Router - For navigation between pages</li>
                        <li>Vite - Modern frontend build tool</li>
                        <li>CSS - For styling and responsive design</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
