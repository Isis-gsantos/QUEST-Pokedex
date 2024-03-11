import { useContext, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import styled from "styled-components";
import { BsSun, BsMoon } from "react-icons/bs";

export const ButtonThemeToggle = (props) => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <ButtonToggle {...props} 
        onClick={() => {
            setTheme(theme === themes.lightMode ? themes.darkMode : themes.lightMode);
        }}>
            {theme === themes.lightMode ? <BsSun /> : <BsMoon />}
        </ButtonToggle>
    );
};

const ButtonToggle = styled.button`
    border: none;
    border-radius: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    color: #000;
    cursor: pointer;
    font-size: 22px;
    font-weight: 700;
    transition: .3s ease-in-out;

    &:hover {
        background-color: #14213d;
        color: #ffbe0b;
        
    }
`