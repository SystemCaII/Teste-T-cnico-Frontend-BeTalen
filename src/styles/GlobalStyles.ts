import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Family Robot;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyles;

