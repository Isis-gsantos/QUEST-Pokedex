import axios from "axios";
import { useEffect, useState } from "react";

async function fetchPokemonKanto() {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
        const pokemonData = response.data.results;
        // console.log('deu certo', pokemonData);
        return pokemonData.map(pokemon => pokemon.url);
    } catch (error) {
        console.log('deu erro');
    }
}

async function getPokemonData(pokeUrl) {
    try {
        const response = await axios.get(pokeUrl);

        const data = response.data;
        // console.log(data.moves[0].move.name);
        return {
            id: data.id,
            name: data.name,
            abilities : data.abilities[0].ability.name,
            images: data.sprites.other.dream_world.front_default,
            type: data.types[0].type.name
        };

    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

async function getPokeInfo() {
    try {
        const pokemonUrls = await fetchPokemonKanto();
        const pokemonData = await Promise.all(pokemonUrls.map(url => getPokemonData(url)));
        console.log(pokemonData);
    } catch {
        console.log('erro ao buscar informações dos Pokémon.');
    }
}

export const Pokemon = () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getPokeInfo();
    }, [])

   return (
    <>

    </>
   )
}