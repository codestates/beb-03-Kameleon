import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import MainPage from './pages/MainPage';
import PoolPage from './pages/PoolPage';
import MyPage from './pages/MyPage';
import GovernPage from './pages/GovernPage';

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
            <Route path="/" element={<MainPage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/govern" element={<GovernPage />} />
          </Routes>
        </MainStyle>
        <Footer />
      </BrowserRouter>
    </AppStyle>
  );
}

export default App;
