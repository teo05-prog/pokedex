import '../styles/TypeFilter.css';

// Pokémon type colors with external icon paths
const POKEMON_TYPES = [
    { name: 'normal', color: '#A8A878', icon: 'types/normal.png' },
    { name: 'fire', color: '#F08030', icon: 'types/fire.png' },
    { name: 'water', color: '#6890F0', icon: 'types/water.png' },
    { name: 'grass', color: '#78C850', icon: 'types/grass.png' },
    { name: 'electric', color: '#F8D030', icon: 'types/electric.png' },
    { name: 'ice', color: '#98D8D8', icon: 'types/ice.png' },
    { name: 'fighting', color: '#C03028', icon: 'types/fighting.png' },
    { name: 'poison', color: '#A040A0', icon: 'types/poison.png' },
    { name: 'ground', color: '#E0C068', icon: 'types/ground.png' },
    { name: 'flying', color: '#A890F0', icon: 'types/flying.png' },
    { name: 'psychic', color: '#F85888', icon: 'types/psychic.png' },
    { name: 'bug', color: '#A8B820', icon: 'types/bug.png' },
    { name: 'rock', color: '#B8A038', icon: 'types/rock.png' },
    { name: 'ghost', color: '#705898', icon: 'types/ghost.png' },
    { name: 'dragon', color: '#7038F8', icon: 'types/dragon.png' },
    { name: 'dark', color: '#705848', icon: 'types/dark.png' },
    { name: 'steel', color: '#B8B8D0', icon: 'types/steel.png' },
    { name: 'fairy', color: '#EE99AC', icon: 'types/fairy.png' },
];

export default function TypeFilter({ selectedType, onTypeChange }) {
    return (
        <div className="type-filter-container">
            <h3>Filter by Type</h3>
            <div className="type-filter-grid">
                <button
                    className={`type-filter-btn ${selectedType === null ? 'active' : ''}`}
                    onClick={() => onTypeChange(null)}
                >
                    <span className="type-icon">✓</span>
                    <span className="type-name">All Types</span>
                </button>
                {POKEMON_TYPES.map((type) => (
                    <button
                        key={type.name}
                        className={`type-filter-btn ${selectedType === type.name ? 'active' : ''}`}
                        style={{
                            borderColor: type.color,
                            backgroundColor: selectedType === type.name ? type.color : 'transparent',
                            color: selectedType === type.name ? 'white' : '#333',
                        }}
                        onClick={() => onTypeChange(type.name)}
                        title={type.name}
                    >
                        <img
                            src={type.icon}
                            alt={type.name}
                            className="type-icon-img"
                        />
                        <span className="type-name">{type.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
