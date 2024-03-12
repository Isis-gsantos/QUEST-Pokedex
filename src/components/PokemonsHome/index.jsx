import { useContext, useEffect, useState } from "react";
import { fetchPokemonKanto, getPokemonData, getPokemonTypes } from "../FunctionsFetchAPI/FunctionPokeAPI";
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import pokeballImage from '../../images/pokeball-minimalist.png'

export const PokemonsHome = () => {
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

    const { theme } = useContext(ThemeContext)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Content>
                        {pokemons.slice(0, totalPokemonsToShow).map(pokemon => (
                            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                                <PokemonInfo key={pokemon.id} type={pokemon.type}
                                style={{backgroundImage: `url(${pokeballImage})`, backgroundRepeat: "no-repeat", backgroundPosition: 'left'}}>
                                    <img src={pokemon.images} alt={pokemon.name} />
                                    <section>
                                        <span># {pokemon.id}</span>
                                        <h3>{pokemon.name}</h3>
                                        <p>{pokemon.type}</p>
                                    </section>
                                </PokemonInfo>
                            </Link>
                        ))}
                    </Content>
                    <ButtonLoadMore onClick={() => setTotalPokemonsToShow(prevTotal => prevTotal + 10)}>
                        Carregar mais
                    </ButtonLoadMore>
                </Container>
            </ThemeProvider>
        </>
    );
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${(props) => props.theme.background};
`

const Content = styled.article`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 40px 20px;
    gap: 25px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;

    }
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
    padding: 16px;
    color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: center;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    transition: .3s ease-in-out;
    box-shadow: -8px 5px 20px 2px rgba(0,0,0,0.1);
    text-align: center;
    position: relative;

    &:hover {
        transform: scale(1.1);
    }

    section {
        display: flex;
        flex-direction: column;

        span {
        font-size: 16px;
        color: #eee;
       }

        h3 {
        text-transform: capitalize;
        font-size: 20px;
        text-shadow: 2px 2px 4px hsla(0, 0%, 0%, 0.7); 
        }
    }

    img {
        max-width: 130px;
        height: 130px;
        position: relative; 
        margin-left: 0 -10px;
    }      
`

const ButtonLoadMore = styled.button`
    border: none;
    border-radius: 30px;
    background-color: #ffbe0b;
    padding: 10px 20px;
    margin: 20px 0;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: .3s ease-in-out;

    &:hover {
        background-color: #000000;
        color: #ffbe0b;
    }
` 
