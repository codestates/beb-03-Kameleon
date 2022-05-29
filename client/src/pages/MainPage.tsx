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

import { callContract } from '../utils/KAS';
import { kStockTokenCodeTable, exchangeAddressTable } from '../constants/index';
import { GovernPagePollList } from './styles/GovernPage.styles';
import { useDispatch } from 'react-redux';
import { onSelectNav } from '../store/user';

import StockLogo from './../components/StockLogo/StockLogo';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [inputString, setInputString] = useState('');
  const [stockList, setStockList] = useState<TokenList[]>([]);
  const dispatch = useDispatch();
  const currentKlayPrice = useKlaySocket();
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
  }, []);

  useEffect(() => {
    const updateList = async () => {
      const tempList: Array<TokenList> = [];
      let mapList = [];

      // sever에서 naverAPI 데이터 가져옴
      const stockAPI = await axios({
        method: 'get',
        url: `/api/stock/getStocks`,
      });
      const stockData = stockAPI.data.data;

      // tempList에 kStock symbal이랑 code 삽입
      const keyArr = Object.keys(kStockTokenCodeTable);
      const valueArr = Object.values(kStockTokenCodeTable);
      for (let i = 0; i < keyArr.length; i++) {
        tempList.push({ id: i, token: String(keyArr[i]), code: valueArr[i] });
      }

      // mapList에 각각의 속성값 넣기
      mapList = await Promise.all(
        tempList.map(async (item) => {
          let stockName = '';
          let oraclePrice = '';
          const token: any = item.token;

          // name과 oraclePrice 값 넣기
          const idx: number = stockData.findIndex(
            (i: { codeNumber: string }) => i.codeNumber === item.code
          );

          if (idx !== -1) {
            stockName = stockData[idx].stockName;
            oraclePrice = stockData[idx].nowValue;
          }

          // krwPrice 값 구하기
          const klayAmount = await callContract({
            contractName: 'Exchange',
            contractAddress: `${exchangeAddressTable[token]}`,
            methodName: 'getEthAmount',
            parameters: [1],
          });

          const krwPrice = +klayAmount * 1.003 * +currentKlayPrice;

          // premium 값 구하기
          const premium = (krwPrice / +oraclePrice - 1) * 100;

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
      return setStockList(mapList);
    };
    const onLoadData = async () => {
      await updateList();
    };
    onLoadData();
  }, [currentKlayPrice]);

  // const onClickSearchHanler = (e) => {
  //   const keyword = e.target.value;
  //   // setStockList;
  // };

  const filteredStockList = (lst: Array<TokenList>) => {
    const filterList = lst.filter((v: TokenList) => {
      return v.name !== undefined && v.name.includes(inputString.trim());
    });
    // console.log(filterList);
    return filterList;
  };
  const magnifyingGlass = faMagnifyingGlass as IconProp;
  return (
    <MainPageWrapper>
      <h2 className="tit">Stock List</h2>
      <MainPageSearch>
        <FontAwesomeIcon
          icon={magnifyingGlass}
          style={{ color: `var(--green)` }}
          className="icon"
        />
        <input onChange={(e) => changeInput(e)} value={inputString} />
      </MainPageSearch>
      <MainPageList>
        <div className="table-header">
          <span>Name</span>
          <span className="main__oracle">Oracle price</span>
          <span>Pool Price</span>
          <span>
            Premium
            <i>(%)</i>
          </span>
        </div>
        {filteredStockList(stockList).map((el: TokenList, index: number) => (
          <MainPageItem key={index}>
            <Link
              to={`/swap/${el.token}`}
              onClick={() => dispatch(onSelectNav('swap'))}
            >
              <span className="main__name">
                <StockLogo stockName={el.token} /> {el.name}{' '}
                <em>({el.token})</em>
              </span>
              <span className="main__oracle">
                {el.oraclePrice.toLocaleString('ko-KR')}{' '}
                {String.fromCharCode(0x20a9)}
              </span>
              <span className="main__price">
                {Number(el.krwPrice).toLocaleString('ko-KR')}{' '}
                {String.fromCharCode(0x20a9)}
              </span>
              <span>{el.premium}%</span>
            </Link>
          </MainPageItem>
        ))}
      </MainPageList>
    </MainPageWrapper>
  );
};

export default MainPage;
