import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyle, AppStyle, MainStyle } from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import SwapPage from './pages/SwapPage';
import MainPage from './pages/MainPage';
import PoolPage from './pages/PoolPage';
import LiquidityPage from './pages/LiquidityPage';
import MintPage from './pages/MintPage';
import MyPage from './pages/MyPage';
import GovernPage from './pages/GovernPage';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ParallaxContainer from './components/Parallax/ParallaxContainer';

function App() {
  // const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <AppStyle>
        <div>
          <BrowserRouter>
            {/* <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
            <Header />
            <MainStyle className="layout">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/swap" element={<SwapPage />} />
                <Route path="/swap/:token" element={<SwapPage />} />
                <Route path="/pool" element={<PoolPage />} />
                <Route path="/liquidity/:id" element={<LiquidityPage />} />
                <Route path="/mint" element={<MintPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/govern" element={<GovernPage />} />
              </Routes>
            </MainStyle>
            <Footer />
            {/* </CSSTransition>
            </TransitionGroup> */}
          </BrowserRouter>
        </div>
        <ParallaxContainer />
      </AppStyle>
    </>
  );
}

export default App;
