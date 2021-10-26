import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root {
    --primaryBlue: #0E141B;
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
