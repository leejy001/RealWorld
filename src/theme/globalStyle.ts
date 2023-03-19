import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Titillium Web', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  div, p {
    margin: 0;
    padding: 0;
    width: 100%;
    line-height: 1.1;
  }
`;

export default GlobalStyle;
