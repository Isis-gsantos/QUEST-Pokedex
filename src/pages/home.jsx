import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonPage } from "../components/PokemonPage";

export const HomePage = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<PokemonPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}