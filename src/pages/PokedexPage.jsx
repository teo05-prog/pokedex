import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TypeFilter from '../components/TypeFilter';
import '../styles/PokedexPage.css';

const POKEMON_LIMIT = 20;
const API_BASE = 'https://pokeapi.co/api/v2';

export default function PokedexPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [filteredCount, setFilteredCount] = useState(0);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // Create a new AbortController for this effect
        abortControllerRef.current = new AbortController();
        const controller = abortControllerRef.current;

        const fetchPokemon = async () => {
            setLoading(true);
            setError(null);

            try {
                if (selectedType) {
                    // Fetch by type
                    const response = await fetch(`${API_BASE}/type/${selectedType}`, {
                        signal: controller.signal,
                    });

                    if (!response.ok) {
                        setError('Failed to fetch Pokemon type');
                        return;
                    }

                    const data = await response.json();
                    const allPokemon = data.pokemon.map(p => ({
                        name: p.pokemon.name,
                        url: p.pokemon.url,
                    }));

                    setFilteredCount(allPokemon.length);

                    // Apply pagination
                    const offset = currentPage * POKEMON_LIMIT;
                    setPokemonList(allPokemon.slice(offset, offset + POKEMON_LIMIT));
                } else {
                    // Fetch all Pokémon
                    const offset = currentPage * POKEMON_LIMIT;
                    const response = await fetch(
                        `${API_BASE}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`,
                        { signal: controller.signal }
                    );

                    if (!response.ok) {
                        setError('Failed to fetch Pokemon');
                        return;
                    }

                    const data = await response.json();
                    setPokemonList(data.results);
                    setFilteredCount(data.count);
                }
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();

        // Cleanup function
        return () => {
            controller.abort();
        };
    }, [currentPage, selectedType]);

    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCurrentPage(0);
    };

    const nextPage = () => {
        const maxPage = Math.ceil(filteredCount / POKEMON_LIMIT);
        if (currentPage < maxPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const maxPage = Math.ceil(filteredCount / POKEMON_LIMIT);

    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="pokedex-page-wrapper">
            <Header />
            <HeroSection selectedType={selectedType} pokemonCount={filteredCount} />
            <TypeFilter
                selectedType={selectedType}
                onTypeChange={handleTypeChange}
                pokemonCount={filteredCount}
            />

            <div className="pokedex-main-content">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <>
                        <div className="pokemon-list">
                            {pokemonList.map((poke) => {
                                const pokemonId = poke.url.split('/')[6];
                                const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

                                return (
                                    <Link
                                        key={poke.name}
                                        to={`/pokemon/${poke.name}`}
                                        className="pokemon-item"
                                    >
                                        <img
                                            src={officialArtwork}
                                            alt={poke.name}
                                            className="pokemon-image"
                                        />
                                        <span className="pokemon-name">{poke.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="pagination">
                            <button onClick={previousPage} disabled={currentPage === 0}>
                                ← Previous
                            </button>
                            <span className="page-info">
                                Page {currentPage + 1} of {maxPage}
                            </span>
                            <button onClick={nextPage} disabled={currentPage >= maxPage - 1}>
                                Next →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
