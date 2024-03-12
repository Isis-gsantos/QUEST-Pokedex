import pokedexKanto from '../../images/Pokedex-Kanto.png'
import { ButtonThemeToggle } from '../Context/ButtonThemeToggle'
import styled, { ThemeProvider } from 'styled-components'
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from 'react';

export const Header = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <img src={pokedexKanto} alt="Pokemon Kanto" />
                    <ButtonThemeToggle />
                </Container>
            </ThemeProvider>
        </>
    )
}

const Container = styled.section`
    background-color: ${(props) => props.theme.background};
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ffffff;

    img {
        max-width: 400px;
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        gap: 15px;

        img {
            max-width: 100%;
        }
    }
`