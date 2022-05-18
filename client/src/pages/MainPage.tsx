import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  MainPageWrapper,
  MainPageSearch,
  MainPageList,
  MainPageItem,
} from './styles/MainPage.styles';

import { createTokenList } from '../utils/dummyCreator';
import { callContract, sendContract } from '../utils/KAS';
import { stockPrice } from '../utils/naverApi';

// import { abiList, byteCodeList, handler } from '../utils/contractData';

const MainPage = () => {
  const [input, setInput] = useState('');

  const tokenList = createTokenList(20);

  const tokenList2 = {
    // {
    //   id: i,
    //   name: 'k' + value,
    //   oraclePrice: getRandomInt(0, 100000),
    //   usdPrice: getRandomInt(0, 100000),
    //   krwPrice: value,
    //   change: getRandomInt(-100, 100),
    // };
  };

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handler = async () => {
    // const result = await callContract({
    //   contractName: 'Oracle',
    //   contractAddress: '0xDD776448ded1cAc2108817bAe89fDc72c24474f1',
    //   methodName: 'getStockCodeList',
    // });

    // sendContract({
    //   contractName: 'KStockToken',
    //   contractAddress: '0x58791638902535f1Cfc0004453B0A09bFC50B7bE',
    //   methodName: 'mint',
    //   amount: '0.1',
    // });

    console.log(await stockPrice());
  };

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
        <button onClick={handler}>Hi</button>
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
