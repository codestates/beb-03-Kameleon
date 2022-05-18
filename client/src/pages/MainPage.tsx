import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  MainPageWrapper,
  MainPageSearch,
  MainPageList,
  MainPageItem,
} from './styles/MainPage.styles';

import { createTokenList } from '../utils/dummyCreator';

const MainPage = () => {
  const [input, setInput] = useState('');

  const tokenList = createTokenList(20);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

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
        {tokenList.map((el) => (
          <MainPageItem key={el.id}>
            {/* <Link to={`/swap:${el.id}`}> */}
            <div>{el.name}</div>
            <div className="main__oracle">
              {el.oraclePrice.toLocaleString('ko-KR')}
            </div>
            <div>{el.usdPrice.toLocaleString('ko-KR')}</div>
            <div className="main__usd">
              {el.krwPrice.toLocaleString('ko-KR')}
            </div>
            <div>{el.change}%</div>
            {/* </Link> */}
          </MainPageItem>
        ))}
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
