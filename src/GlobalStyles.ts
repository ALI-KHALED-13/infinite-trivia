import { createGlobalStyle } from 'styled-components';



const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Jost Regular', sans-serif;
    font-size: 1.6rem;
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background: white;
    border-radius: 1rem;
  }

  *::-webkit-scrollbar-thumb {
    background-color: gray;
    border: 1px solid white;
    border-radius: 1rem;
  }
  
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  h1 {
    color: orange;
    font-size: 2.4rem;
  }
`;

export default GlobalStyles;
