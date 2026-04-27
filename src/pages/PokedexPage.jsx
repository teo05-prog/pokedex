import {Link} from 'react-router-dom';
import {usePokemon} from '../hooks/usePokemon';
import '../styles/PokedexPage.css';

export default function PokedexPage() {
    const {
        pokemonList,
        loading,
        error,
        currentPage,
        totalCount,
        itemsPerPage,
        nextPage,
        previousPage
    } = usePokemon();

    const maxPage = Math.ceil(totalCount / itemsPerPage);

    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="pokedex-page">
            <h1>Pokedex</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="pokemon-list">
                        {pokemonList.map((poke) => (
                            <Link
                                key={poke.name}
                                to={`/pokemon/${poke.name}`}
                                className="pokemon-item"
                            >
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split('/')[6]}.png`}
                                    alt={poke.name}
                                    className="pokemon-image"
                                />
                                <span
                                    className="pokemon-name">{poke.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="pagination">
                        <button onClick={previousPage}
                                disabled={currentPage === 0}>
                            Previous
                        </button>
                        <span className="page-info">
              Page {currentPage + 1} of {maxPage}
            </span>
                        <button onClick={nextPage}
                                disabled={currentPage >= maxPage - 1}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}