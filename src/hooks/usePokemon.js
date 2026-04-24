import { useState, useEffect } from 'react';

const POKEMON_LIMIT = 20;
const API_BASE = 'https://pokeapi.co/api/v2';

export function usePokemon() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchPokemon(currentPage);
    }, [currentPage]);

    const fetchPokemon = async (page) => {
        try {
            setLoading(true);
            setError(null);

            const offset = page * POKEMON_LIMIT;
            const response = await fetch(
                `${API_BASE}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`
            );

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setPokemonList(data.results);
            setTotalCount(data.count);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const nextPage = () => {
        const maxPage = Math.ceil(totalCount / POKEMON_LIMIT) - 1;
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return {
        pokemonList,
        loading,
        error,
        currentPage,
        totalCount,
        itemsPerPage: POKEMON_LIMIT,
        nextPage,
        previousPage,
    };
}