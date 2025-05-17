import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

// fonts
import Pretendard200 from './fonts/Pretendard200.woff';
import Pretendard300 from './fonts/Pretendard300.woff';
import Pretendard400 from './fonts/Pretendard400.woff';
import Pretendard500 from './fonts/Pretendard500.woff';
import Pretendard600 from './fonts/Pretendard600.woff';
import Pretendard700 from './fonts/Pretendard700.woff';
import Pretendard800 from './fonts/Pretendard800.woff';

const GlobalStyles = createGlobalStyle`
${Reset}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard200}) format('woff');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard300}) format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard400}) format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard500}) format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard600}) format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard700}) format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  src: local('Pretendard'), url(${Pretendard800}) format('woff');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

:root {
  height: calc(var(--vh, 1vh) * 100);
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  line-height: inherit;
  ::-webkit-scrollbar {
    display: none;
  }
}

body {
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 15px;
  max-width: 720px;
  min-width: 280px;
  height: calc(var(--vh, 1vh) * 100 - 70px);
  margin: 0 auto;
  color: ${(props) => props.theme.font_color};
  ::-webkit-scrollbar {
    display: none;
  }
}
a {
  text-decoration: none;
  color: inherit;
}
button {
  font-family: 'Pretendard', sans-serif;
  background: transparent;
  font-size: 15px;
  color: ${(props) => props.theme.font_color};
  border: 0 none;
  outline:none;
  cursor: pointer;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}
ol, ul, li {
  list-style: none;
}
select, option {
  background: transparent;
  font-family: 'Pretendard', sans-serif;
  -webkit-appearance:none; /* for chrome */
  -moz-appearance:none; /*for firefox*/
  appearance:none;
  outline: 0 none;
  color: ${(props) => props.theme.font_color};
}
a, button, input {
  font-family: 'Pretendard', sans-serif;
  appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  outline:none;
  border: none;
  &:disabled {
    cursor: default;
  }
}

`;

export default GlobalStyles;
