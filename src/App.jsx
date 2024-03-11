import { HomePage } from "./pages/home"
import { createGlobalStyle } from "styled-components"


function App() {

  return (
    <>
      <GlobalStyle />
      <HomePage />
    </>
  )
}

const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: "Nunito", sans-serif;
    text-decoration: none
  }
`

export default App

