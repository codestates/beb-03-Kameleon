import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Location,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle, AppStyle, MainStyle } from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ParallaxContainer from './components/Parallax/ParallaxContainer';

// import SwapPage from './pages/SwapPage';
// import MainPage from './pages/MainPage';
// import PoolPage from './pages/PoolPage';
// import LiquidityPage from './pages/LiquidityPage';
// import MintPage from './pages/MintPage';
// import MyPage from './pages/MyPage';
// import GovernPage from './pages/GovernPage';
// const Home = lazy(() => import('./routes/Home'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const PoolPage = lazy(() => import('./pages/PoolPage'));
const LiquidityPage = lazy(() => import('./pages/LiquidityPage'));
const MintPage = lazy(() => import('./pages/MintPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const GovernPage = lazy(() => import('./pages/GovernPage'));

const Animation = () => {
  const location: Location = useLocation();
  const [displayLocation, setDisplayLocation] =
    React.useState<Location>(location);
  const [transitionStage, setTransistionStage] =
    React.useState<string>('fadeIn');
  React.useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <>
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransistionStage('fadeIn');
            setDisplayLocation(location);
          }
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes location={displayLocation}>
            <Route path="/" element={<MainPage />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/swap/:token" element={<SwapPage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/liquidity/:id" element={<LiquidityPage />} />
            <Route path="/mint" element={<MintPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/govern" element={<GovernPage />} />
          </Routes>
        </Suspense>
      </div>
      {/* <ToastContainer icon={false} /> */}
    </>
  );
};

function App() {
  return (
    <>
      <GlobalStyle />
      <AppStyle>
        <div>
          <BrowserRouter>
            <Header />
            <MainStyle className="layout">
              <Animation />
            </MainStyle>
            <Footer />
          </BrowserRouter>
        </div>
        <ParallaxContainer />
      </AppStyle>
    </>
  );
}

export default App;
