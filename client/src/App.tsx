import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './page/HomePage';

const AppStyle = styled.main`
  min-height: 100vh;
  background-color: #41a58d;
`;

const MainStyle = styled.main`
  min-height: calc(100vh - 123px);
`;

function App() {
  return (
    <AppStyle>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <MainStyle className="layout">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </MainStyle>
        <Footer />
      </BrowserRouter>
    </AppStyle>
  );
}

export default App;
