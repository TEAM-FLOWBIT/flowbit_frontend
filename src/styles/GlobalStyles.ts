import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard-Regular.otf') format('otf');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }
    * {
        margin: 0;
        padding: 0;
    }
    html{
        font-size: 62.5%;
    }
    body{
        font-family: Pretendard;
        font-weight: normal; 
        font-style : normal;
    }
`;

export default GlobalStyles;
