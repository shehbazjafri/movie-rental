import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root {
    --primaryBlue: #0E141B;
    --darkgrey: #3D3D3D;
    --white: #FFFFFF;
    --red: #FF0000;
    --lightblue: #2ACAEA;
    --lightgreen: #9AB973;
    --grey: #ccc;
    --black05: rgba(0, 0, 0, 0.5);
  }
  html {
    background: var(--primaryBlue);
    font-size: 10px;
  }
  body {
    font-size: 2rem;
  }
`;

export default GlobalStyles;
