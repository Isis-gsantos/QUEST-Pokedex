import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { getPokemonData } from '../FunctionsFetchAPI/FunctionPokeAPI';
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext } from "../Context/ThemeContext";

export const PokemonPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            const pokemonData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(pokemonData);
        }
        fetchPokemon();
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    const { theme } = useContext(ThemeContext)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Content>
                        <Link to='/'>Return</Link>
                        <nav>
                            <ul>
                                <li><img src={pokemon.pokemonImage} alt="" /></li>
                                <li><h2>{pokemon.name}</h2></li>
                                <li>{pokemon.type}</li>
                                <li>{pokemon.abilities}</li>
                                <li>{pokemon.moves}</li>
                            </ul>
                        </nav>
                    </Content>
                </Container>
            </ThemeProvider>
        </>
    );
};

const Container = styled.section`
    background-color: ${(props) => props.theme.background};
    min-height: 80.4vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.article`
    background-color: #fff;
`