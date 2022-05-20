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
  name?: string;
  oraclePrice?: string;
  usdPrice?: string;
  krwPrice?: string;
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

  // const onLoadData = async () => {
  //   const tempList: Array<TokenList> = [];

  //   const stockAPI = await axios({
  //     method: 'get',
  //     url: `http://localhost:4001/api/stock/getStocks`,
  //   });
  //   const stockData = stockAPI.data.data;

  //   //
  //   const keyArr = Object.keys(kStockTokenCodeTable);
  //   const valueArr = Object.values(kStockTokenCodeTable);
  //   for (let i = 0; i < keyArr.length; i++) {
  //     tempList.push({ token: String(keyArr[i]), code: valueArr[i] });
  //   }

  //   try {
  //     const list = await Promise.all(
  //       tempList.map(async (item) => {
  //         let stockName = '';
  //         let oraclePrice = '';
  //         const token: any = item.token;
  //         const idx: number = stockData.findIndex(
  //           (i: { codeNumber: string }) => i.codeNumber === item.code
  //         );

  //         if (idx !== -1) {
  //           stockName = stockData[idx].stockName;
  //           oraclePrice = stockData[idx].nowValue;
  //         }

  //         const ktokenPrice: string = await callContract({
  //           contractName: 'KStockToken',
  //           contractAddress: `${kStockTokenAddressTable[token]}`,
  //           methodName: 'balanceOf',
  //           parameters: [`${exchangeAddressTable[token]}`],
  //         }).then();

  //         const klayPrice = await getBalance({
  //           address: `${exchangeAddressTable[token]}`,
  //         });

  //         const krwPrice =
  //           (Number(ktokenPrice) / Number(klayPrice)) *
  //           Number(currentKlayPrice);

  //         // const premium = (Number(oraclePrice) / krwPrice - 1) * 100;

  //         return {
  //           name: stockName,
  //           oraclePrice: oraclePrice,
  //           krwPrice: String(krwPrice),
  //           // premium: string,
  //           code: item.code,
  //           token: token,
  //         };
  //       })
  //     );
  //     console.log('list', list);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   return tempList;
  // };

  useEffect(() => {
    const callPoolList = async () => {
      const tempList: Array<TokenList> = [];

      const stockAPI = await axios({
        method: 'get',
        url: `http://localhost:4001/api/stock/getStocks`,
      });
      const stockData = stockAPI.data.data;

      //
      const keyArr = Object.keys(kStockTokenCodeTable);
      const valueArr = Object.values(kStockTokenCodeTable);
      for (let i = 0; i < keyArr.length; i++) {
        tempList.push({ token: String(keyArr[i]), code: valueArr[i] });
      }

      try {
        const list = await Promise.all(
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

            const ktokenPrice: string = await callContract({
              contractName: 'KStockToken',
              contractAddress: `${kStockTokenAddressTable[token]}`,
              methodName: 'balanceOf',
              parameters: [`${exchangeAddressTable[token]}`],
            }).then();

            const klayPrice = await getBalance({
              address: `${exchangeAddressTable[token]}`,
            });

            const krwPrice =
              (Number(ktokenPrice) / Number(klayPrice)) *
              Number(currentKlayPrice);

            // const premium = (Number(oraclePrice) / krwPrice - 1) * 100;

            return {
              name: stockName,
              oraclePrice: oraclePrice,
              krwPrice: String(krwPrice),
              // premium: string,
              code: item.code,
              token: token,
            };
          })
        );
        console.log('list', list);
      } catch (err) {
        console.log(err);
      }

      return setStockList(tempList);
    };
    console.log('callPoolList', callPoolList());
    // setStockList(data);
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
        {/* {stockList.map((el) => (
          <MainPageItem key={el.id}>
            <Link to={`/swap/${el.name}`}>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.oraclePrice.toLocaleString('ko-KR')}
              </div>
              <div>{el.usdPrice.toLocaleString('ko-KR')}</div>
              <div className="main__usd">
                {el.krwPrice.toLocaleString('ko-KR')}
              </div>
              <div>{el.change}%</div>
            </Link>
          </MainPageItem>
        ))} */}
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
