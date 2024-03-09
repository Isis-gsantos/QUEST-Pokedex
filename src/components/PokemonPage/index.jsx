import { useEffect, useState } from "react";
import { fetchPokemonKanto, getPokemonData, getPokemonTypes } from "../FunctionsFetchAPI/FunctionPokeAPI";
import styled from "styled-components";

export const PokemonPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loadedPokemonIds, setLoadedPokemonIds] = useState(new Set());
    const [totalPokemonsToShow, setTotalPokemonsToShow] = useState(10);
    const [pokemonTypes, setPokemonTypes] = useState([]);

    useEffect(() => {
        fetchMorePokemons();
        fetchPokemonTypes();
    }, []);

    async function fetchPokemonTypes() {
        const types = await getPokemonTypes();
        setPokemonTypes(types);
    }

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
        setLoadedPokemonIds(new Set(pokemons.map(pokemon => pokemon.id)));
    }, [pokemons]);

    return (
        <>
            <Container>
                <Content>
                    {pokemons.slice(0, totalPokemonsToShow).map(pokemon => (
                        <PokemonInfo key={pokemon.id} type={pokemon.type}>
                            <img src={pokemon.images} alt={pokemon.name} />
                            <section>
                                <div>
                                    <span>{pokemon.id}.</span>
                                    <h3>{pokemon.name}</h3>
                                </div>
                                <li>{pokemon.type}</li>
                            </section>
                        </PokemonInfo>
                    ))}
                </Content>
                <button onClick={() => setTotalPokemonsToShow(prevTotal => prevTotal + 10)}>Load More</button>
            </Container>
        </>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #eee;
`

const Content = styled.article`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 20px;
    gap: 25px;
`

const PokemonInfo = styled.div`
    background-color: ${({ type }) => {
        switch (type.split(" ")[0]) {
            case 'fire': return '#d00000';
            case 'normal': return '#e6b8a2';
            case 'water': return '#00b4d8';
            case 'grass': return '#6ede8a';
            case 'bug': return '#2dc653';
            case 'psychic': return '#ff758f';
            case 'flying': return '#779be7';
            case 'electric': return '#ffdd00';
            case 'ice': return '#bde0fe';
            case 'dragon': return '#6930c3';
            case 'rock': return '#b08968';
            case 'fighting': return '#7f5539';
            case 'ground': return '#ecb176';
            case 'poison': return '#b43e8f';
            case 'fairy': return '#ffadc7';
            case 'ghost': return '#7209b7';

            default:
                return '#fff'; 
        }
    }};
    padding: 16px 0 16px 16px;
    color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: center;
    align-items: center;
    cursor: pointer;
    transition: .3s ease-in-out;
    box-shadow: -11px 8px 21px 11px rgba(0,0,0,0.1);

    &:hover {
        transform: scale(1.1);
    }

    section {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
    }

    img {
            max-width: 120px;
            height: 120px;
        }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        span {
            font-size: 16px;
        }

        h3 {
        margin: 5px 0;
        text-transform: capitalize;
        font-size: 20px;
        }
    }
    
`