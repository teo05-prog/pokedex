import { useState, useEffect } from 'react';

const API_BASE = 'https://pokeapi.co/api/v2';

export function usePokemonDetail(name) {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!name) return;

        const fetchDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${API_BASE}/pokemon/${name}`);

                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [name]);

    return { pokemon, loading, error };
}