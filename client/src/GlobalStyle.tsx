import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import bgImage from './assets/images/bg.jpg';

export const GlobalStyle = createGlobalStyle`
  :root {
    --light-green: #92e5d0;
    --green: #41A58D;
    --dark-green: #276955;
    --deep-green: #133027;
    --black: #000000;
    --white: #ffffff;
    --blue: #6675FF;
    --red: #FF6363;
    --gray: #999;

    --width: 1200px;
    --s-width: 640px;
    --m-size: 760px;

    --shadowSharp: 0 1px 1px rgb(0 0 0 / 25%), 0 2px 2px rgb(0 0 0 / 20%),
      0 4px 4px rgb(0 0 0 / 15%), 0 8px 8px rgb(0 0 0 / 10%),
      0 16px 16px rgb(0 0 0 / 5%);
  }

  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 480px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  * { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'; font-size: 18px;}
  a { cursor: pointer; text-decoration: none; }
  h1, h2, h3, h4, ol, ul, dl, dt, dd { margin: 0; padding: 0; }
  ol, ul { list-style: none; }

  .layout {
    max-width: 1200px;
    padding: 0 24px;
    margin: auto;
  }

  .tit {
    padding: 1rem 0;
    color: var(--white);
    font-size: 1.8rem;
  }

  @media (max-width: 760px) {
    * { font-size: 14px; }
  }
`;

export const AppStyle = styled.main`
  min-height: 100vh;
  /* background-color: var(--dark-green); */
  background: linear-gradient(
      rgba(39, 105, 85, 0.5) 100%,
      rgba(39, 105, 85, 0.5) 100%
    ),
    url(${bgImage});
  background-size: 50%;
  z-index: 1;
  & > div {
    position: relative;
    z-index: 1;
  }
`;

export const MainStyle = styled.main`
  min-height: calc(100vh - 125px);
  box-sizing: border-box;

  @media (max-width: 760px) {
    min-height: calc(100vh - 105px);
  }
`;
