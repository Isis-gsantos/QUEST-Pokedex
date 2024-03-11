import axios from "axios";

export async function fetchPokemonKanto(offset) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=151`);
        const pokemonData = response.data.results;
        return pokemonData.map(pokemon => pokemon.url);
    } catch (error) {
        console.log('Erro ao buscar pokémons:', error);
        return [];
    }
}

export async function getPokemonData(pokeUrl) {
    try {
        const response = await axios.get(pokeUrl);
        const data = response.data;
        console.log(data);
        return {
            id: data.id,
            name: data.name,
            abilities: data.abilities.map(ability => ability.ability.name).join(", "),
            pokemonImage: data.sprites.other.dream_world.front_default,
            images: data.sprites.front_default,
            type: data.types.map(type => type.type.name).join(" "),
            moves: data.moves.slice(0, 4).map(move => move.move.name).join(", ")
        };
    } catch (error) {
        console.error('Erro ao obter dados do pokémon:', error);
        return null;
    }
}

export async function getPokemonTypes() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/type/')
        // console.log(response.data.results[10].name);
        const data = response.data.results
        return data.map(types => types.name)
    } catch {
        console.log('Erro ao buscar tipos:', error);
        return [];
    }
}