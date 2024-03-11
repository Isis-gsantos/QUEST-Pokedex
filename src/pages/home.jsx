import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonsHome } from "../components/PokemonsHome";
import { ThemeProvider } from "../components/Context/ThemeContext";
import { Header } from "../components/header/header";
import { PokemonPage } from "../components/PokemonPage";

export const HomePage = () => {
    return (
        <>
            <ThemeProvider>
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<PokemonsHome />} />
                        <Route exact path='/pokemon/:id' element={<PokemonPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

