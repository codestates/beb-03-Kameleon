import React, { useState, useCallback } from 'react';

import {
  MainPageWrapper,
  MainPageSearch,
  MainPageList,
} from './MainPage.styles';

const MainPage = () => {
  const [input, setInput] = useState('');

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  console.log(input);

  return (
    <MainPageWrapper>
      <h2>Stock List</h2>
      <MainPageSearch>
        <input onChange={(e) => changeInput(e)} />
        <button>Search</button>
      </MainPageSearch>
      <MainPageList>
        <div>
          <div>Name</div>
          <div className="main__oracle">Oracle price</div>
          <div>Price(KRW)</div>
          <div className="main__usd">Price(USD)</div>
          <div>Change</div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
