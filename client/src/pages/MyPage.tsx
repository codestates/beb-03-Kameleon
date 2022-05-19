import React from 'react';
import { useState, useEffect } from 'react';

import {
  MyPageWrapper,
  MyPageList,
  MyPageItem,
  MyPageBar,
} from './styles/MyPage.styles';

import {
  createMyList,
  createMyPollList,
  createMyGovernList,
} from '../utils/dummyCreator';
import { callContract } from '../utils/KAS';
import { contractAddressTable, kStockTokenAddressTable } from './../constants';

interface TokenListProps {
  id: number;
  name: string;
  balance: number;
  value: number;
}

const MyPage = () => {
  // const myList = createMyList(5);
  const [myList, setMyList] = useState<Array<TokenListProps>>([]);

  const myPoolList = createMyPollList(5);
  const myGovernList = createMyGovernList(5);

  useEffect(() => {
    // let valueTemp: Array<String> = [];
    const test = async () => {
      const valueTemp: Array<string> = await callContract({
        contractName: 'Oracle',
        contractAddress: contractAddressTable.Oracle,
        methodName: 'getOraclePrice',
      });
      const nameTable = Object.keys(kStockTokenAddressTable);
      const tokenPriceList = [];
      const myList: any = [];
      for (let i = 0; i < nameTable.length; i++) {
        tokenPriceList.push(
          callContract({
            contractName: 'KStockToken',
            contractAddress: kStockTokenAddressTable[nameTable[i]],
            methodName: 'balanceOf',
            parameters: [window.klaytn.selectedAddress],
          }).then((res) => {
            myList.push({
              id: i,
              name: nameTable[i],
              balance: res / 1000000000000000000,
              value: Number(valueTemp[i]) / 1000000000000000000,
            });
          })
        ); // array 삽입);
      }
      const res = await Promise.all(tokenPriceList);
      console.log(res);
      console.log(Object.entries(kStockTokenAddressTable));
      // 위의 포문으로 배열 i개 삽입 후 setMyList
      // Promise.all(p[1], p[2]);
      console.log(myList);
      setMyList(myList);
    };
    test();
  }, []);

  return (
    <div>
      <MyPageWrapper>
        <h2>자산</h2>
        <MyPageList>
          <div>
            <div>Ticker ID</div>
            <div>Balance</div>
            <div>Value</div>
            <div>Total</div>
          </div>
          {myList.map((el) => (
            <MyPageItem>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.balance.toLocaleString('ko-KR')}
              </div>
              <div>{el.value.toLocaleString('ko-KR')} KLY</div>
              <div>{(el.balance * el.value).toLocaleString('ko-KR')} KLY</div>
            </MyPageItem>
          ))}
        </MyPageList>
        <h2>Pool</h2>
        <MyPageList>
          <div>
            <div>Pool ID</div>
            <div>Balance</div>
            <div>Value</div>
            <div>ROI</div>
          </div>
          {myPoolList.map((el) => (
            <MyPageItem key={el.id}>
              <div>{el.name}</div>
              <div className="main__oracle">
                1KLY + {el.balance.toLocaleString('ko-KR')}KSE
              </div>
              <div>{el.value.toLocaleString('ko-KR')} KLY</div>
              <div>12.34%</div>
            </MyPageItem>
          ))}
        </MyPageList>
        <h2>Govern</h2>
        <MyPageList>
          <div>
            <div>Gover ID</div>
            <div>End Time</div>
          </div>
          {myGovernList.map((el) => (
            <MyPageItem>
              <div>{el.name}</div>
              <MyPageBar yes={el.yes} no={el.no}>
                <div></div>
                <div></div>
              </MyPageBar>
              <div>2022-05-20</div>
            </MyPageItem>
          ))}
        </MyPageList>
      </MyPageWrapper>
    </div>
  );
};

export default MyPage;
