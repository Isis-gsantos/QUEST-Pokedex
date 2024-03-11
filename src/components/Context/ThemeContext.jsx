import { createContext, useState } from "react";

export const themes = {
    lightMode: {
        background: '#ffffff'
    },
    darkMode: {
        background: '#000000'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {
    const [ theme, setTheme ] = useState(themes.lightMode)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}