import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import PoolPage from './pages/PoolPage';

function App() {
  return (
    <div className="App">
      <MainPage />
      <PoolPage />
      <MyPage />
    </div>
  );
}

export default App;
