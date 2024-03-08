import axios from "axios";
import { useEffect, useState } from "react";

async function fetchPokemonKanto(offset) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=151`);
        const pokemonData = response.data.results;
        
        return pokemonData.map(pokemon => pokemon.url);
    } catch (error) {
        console.log('Erro ao buscar pokémons:', error);
        return [];
    }
}

async function getPokemonData(pokeUrl) {
    try {
        const response = await axios.get(pokeUrl);
        const data = response.data;
        // console.log(data);
        return {
            id: data.id,
            name: data.name,
            abilities: data.abilities.map(ability => ability.ability.name).join(", "),
            images: data.sprites.other.dream_world.front_default,
            type: data.types.map(type => type.type.name).join(", "),
            moves: data.moves.slice(0, 4).map(move => move.move.name).join(", ")
        };
    } catch (error) {
        console.error('Erro ao obter dados do pokémon:', error);
        return null;
    }
}

export const Pokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loadedPokemonIds, setLoadedPokemonIds] = useState(new Set()); 
    const [totalPokemonsToShow, setTotalPokemonsToShow] = useState(10);

    async function fetchMorePokemons() {
        const pokemonUrls = await fetchPokemonKanto(offset);
        const newPokemonsData = await Promise.all(pokemonUrls.map(url => getPokemonData(url)));
        const filteredPokemons = newPokemonsData.filter(pokemon => !loadedPokemonIds.has(pokemon.id));

        setPokemons(prevPokemons => [...prevPokemons, ...filteredPokemons]);
        setOffset(prevOffset => prevOffset + 10);

        if (pokemons.length + 10 >= 151) {
            setTotalPokemonsToShow(151);
        }
    }

    useEffect(() => {
        fetchMorePokemons();
    }, []); 

    return (
        <>
            <div>
                {pokemons.slice(0, totalPokemonsToShow).map(pokemon => (
                    <div key={pokemon.id}>
                        <img src={pokemon.images} alt={pokemon.name} />
                        <li>Name: {pokemon.name}</li>
                        <li>Abilities: {pokemon.abilities}</li>
                        <li>Type: {pokemon.type}</li>
                        <li>Moves: {pokemon.moves}</li>
                    </div>
                ))}
            </div>
            <button onClick={() => setTotalPokemonsToShow(prevTotal => prevTotal + 10)}>Load More</button>
        </>
    );
};
