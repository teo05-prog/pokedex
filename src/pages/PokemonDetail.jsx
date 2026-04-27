import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import '../styles/PokemonDetail.css';

export default function PokemonDetail() {
    const { name } = useParams();
    const { pokemon, loading, error } = usePokemonDetail(name);

    if (loading) return <div className="detail-page"><p>Loading...</p></div>;
    if (error) return <div className="detail-page"><p className="error">Error: {error}</p></div>;
    if (!pokemon) return <div className="detail-page"><p>Pokemon not found</p></div>;

    return (
        <div className="detail-page">
            <div className="detail-wrapper">
                <Link to="/" className="back-link">← Back to Pokedex</Link>

                <div className="detail-container">
                    <div className="detail-header">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="detail-image"
                        />
                        <div className="detail-info">
                            <h1>{pokemon.name}</h1>

                            <div className="types">
                                {pokemon.types.map((typeObj) => (
                                    <span key={typeObj.type.name} className={`type ${typeObj.type.name}`}>
                                        {typeObj.type.name}
                                    </span>
                                ))}
                            </div>

                            <div className="info-boxes">
                                <div className="info-box">
                                    <span className="label">Height</span>
                                    <span className="value">{(pokemon.height / 10).toFixed(1)} m</span>
                                </div>
                                <div className="info-box">
                                    <span className="label">Weight</span>
                                    <span className="value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-stats">
                        <h2>Stats</h2>
                        <div className="stats-grid">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name} className="stat-item">
                                    <span className="stat-name">{stat.stat.name}</span>
                                    <div className="stat-bar-container">
                                        <div className="stat-bar">
                                            <div
                                                className="stat-fill"
                                                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="stat-value">{stat.base_stat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detail-section">
                        <h2>Abilities</h2>
                        <div className="abilities">
                            {pokemon.abilities.map((abilityObj) => (
                                <div key={abilityObj.ability.name} className="ability">
                                    <span className="ability-name">{abilityObj.ability.name}</span>
                                    {abilityObj.is_hidden && <span className="hidden-badge">Hidden</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
