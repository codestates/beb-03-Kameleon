import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useKlaySocket } from '../utils/bithumbSocket';

import {
  MainPageWrapper,
  MainPageSearch,
  MainPageList,
  MainPageItem,
} from './styles/MainPage.styles';

import { createTokenList } from '../utils/dummyCreator';
import { callContract, getBalance } from '../utils/KAS';
import {
  kStockTokenAddressTable,
  kStockTokenCodeTable,
  exchangeAddressTable,
} from '../constants/index';

interface TokenList {
  id?: number;
  name?: string;
  oraclePrice?: any;
  krwPrice?: any;
  premium?: string;
  code?: string;
  token?: string;
}

const MainPage = () => {
  const [input, setInput] = useState('');
  const [stockList, setStockList] = useState<TokenList[]>([]);
  const currentKlayPrice = useKlaySocket();
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const updateList = async () => {
    const tempList: Array<TokenList> = [];
    let mapList = [];

    // sever에서 naverAPI 데이터 가져옴
    const stockAPI = await axios({
      method: 'get',
      url: `http://localhost:4001/api/stock/getStocks`,
    });
    const stockData = stockAPI.data.data;

    // tempList에 kStock symbal이랑 code 삽입
    const keyArr = Object.keys(kStockTokenCodeTable);
    const valueArr = Object.values(kStockTokenCodeTable);
    for (let i = 0; i < keyArr.length; i++) {
      tempList.push({ id: i, token: String(keyArr[i]), code: valueArr[i] });
    }

    mapList = await Promise.all(
      tempList.map(async (item) => {
        let stockName = '';
        let oraclePrice = '';
        const token: any = item.token;
        const idx: number = stockData.findIndex(
          (i: { codeNumber: string }) => i.codeNumber === item.code
        );

        if (idx !== -1) {
          stockName = stockData[idx].stockName;
          oraclePrice = stockData[idx].nowValue;
        }

        const klayAmount = await callContract({
          contractName: 'Exchange',
          contractAddress: `${exchangeAddressTable[token]}`,
          methodName: 'getEthAmount',
          parameters: [1],
        });

        const krwPrice = +klayAmount * 1.003 * +currentKlayPrice;

        const premium = (+oraclePrice / krwPrice - 1) * 100;

        return {
          name: stockName,
          oraclePrice: oraclePrice,
          krwPrice: String(Math.floor(krwPrice)),
          premium: String(premium.toFixed(2)),
          code: item.code,
          token: token,
        };
      })
    );
    console.log('map', mapList);
    return setStockList(mapList);
  };

  useEffect(() => {
    const onLoadData = async () => {
      await updateList();
      console.log('stockList1', stockList);
    };
    onLoadData();
  }, [currentKlayPrice]);

  console.log('stockList', stockList);
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
          <div>Premium(%)</div>
        </div>
        {stockList.map((el, index) => (
          <MainPageItem key={index}>
            <Link to={`/swap/${el.token}`}>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.oraclePrice.toLocaleString('ko-KR')}
              </div>
              <div className="main__usd">
                {el.krwPrice.toLocaleString('ko-KR')}
              </div>
              <div>{el.premium}%</div>
            </Link>
          </MainPageItem>
        ))}
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
