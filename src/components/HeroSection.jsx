import '../styles/HeroSection.css';

export default function HeroSection({ selectedType, pokemonCount }) {
    const getDescription = () => {
        if (selectedType) {
            return `Discover through ${pokemonCount} amazing ${selectedType} Pokémon`;
        }
        return 'Discover through 1350 amazing Pokémon';
    };

    return (
        <section className="hero-heading">
            <h1>Discover Pokémon</h1>
            <p>{getDescription()}</p>
        </section>
    );
}
