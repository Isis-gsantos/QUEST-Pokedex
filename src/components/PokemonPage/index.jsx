import { useState, useEffect, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import { getPokemonData } from '../FunctionsFetchAPI/FunctionPokeAPI';
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext } from "../Context/ThemeContext";
import wallpaper from '../../images/wallpaper.jpg'
import pokeball from '../../images/pokeball.png'
import { BsArrowLeftCircle } from "react-icons/bs";

export const PokemonPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const { theme } = useContext(ThemeContext)

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

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Content>
                        <PokemonImage src={pokemon.images} alt="pokemon" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

                        <nav>
                            <ul>
                                <li><Link to='/'> <BsArrowLeftCircle /> Return</Link></li>
                                <NameStyle>
                                    <img src={pokeball} alt="" />
                                    <span>Nº {pokemon.id}</span>
                                    <h2>{pokemon.name}</h2>
                                </NameStyle>
                                <StylingList><b>Type</b> {pokemon.type}</StylingList>
                                <StylingList><b>Abilities:</b> {pokemon.abilities}</StylingList>
                                <StylingList><b>Moves:</b> {pokemon.moves}</StylingList>
                            </ul>

                            <StylingStats>
                                <h3>Base stats</h3>
                                <div>
                                    <li>HP {pokemon.hpStat}</li>
                                    <li>Attack {pokemon.attackStat}</li>
                                    <li>Defense {pokemon.defenseStat}</li>
                                    
                                    <li>Special attack {pokemon.specialAttackStat}</li>
                                    <li>Special Defense {pokemon.specialDefenseStat}</li>
                                    <li>Speed {pokemon.speedStat}</li>
                                </div>
                            </StylingStats>
                        </nav>
                    </Content>
                </Container>
            </ThemeProvider>
        </>
    );
};

const Container = styled.section`
    background-color: ${(props) => props.theme.background};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    padding: 20px 0;
`

const Content = styled.article`
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
    gap: 40px;
    border-radius: 20px;
    padding: 20px 10px;
    border: 1px solid #eee;
    box-shadow: -8px 5px 20px 2px rgba(0,0,0,0.1);

    a {
        color: #000;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    li {
        /* margin: 15px 0; */
        font-weight: 500;
        text-transform: capitalize;

        b {
            background-color: #ffbf00;
            border-radius: 5px;
            padding: 2px 10px;
            
        }
    }

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        max-width: 80%;
    }
`

const PokemonImage = styled.img`
    width: 300px;
    height: 100%;
    border: 5px solid #ffbf00;
    border-radius: 20px;
    box-shadow: 2px 2px 4px hsla(0, 0%, 0%, 0.7);
`

const NameStyle = styled.li`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffbf00;
    border-radius: 30px;
    margin: 10px 0;

    img {
        max-width: 20px;
    }

    h2 {
        text-transform: capitalize;
    }
`

const StylingList = styled.li`
    margin: 15px 0;
`

const StylingStats = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: first baseline;
    margin: 10px 0;
    border-top: 1px solid #eee;

    li {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 5px 0;
    }
`