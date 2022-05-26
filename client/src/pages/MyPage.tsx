import { useState, useEffect } from 'react';

import { MyPageWrapper, MyPageList, MyPageItem } from './styles/MyPage.styles';

import { callContract, getBalance } from '../utils/KAS';
import {
  contractAddressTable,
  kStockTokenAddressTable,
  exchangeAddressTable,
} from './../constants';

import Caver from 'caver-js';
import MyPagePoolItem from '../components/MyPage/MyPagePoolItem';
import MyPageGovern from '../components/MyPage/MyPageGovern';
import StockLogo from './../components/StockLogo/StockLogo';

const caver = new Caver();

interface TokenListProps {
  id: number;
  name: string;
  balance: number;
  value: number;
}

export interface PoolListProps {
  id: number;
  name: string;
  lpToken: string;
  balance: string;
}

const MyPage = () => {
  const [myList, setMyList] = useState<Array<TokenListProps>>([]);
  const [myPoolList, setMyPoolList] = useState<Array<PoolListProps>>([]);

  useEffect(() => {
    // console.log('window.klaytn.selectedAddress', window.klaytn.selectedAddress);
    // get myList
    const getMyList = async () => {
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
            if (res > 0) {
              console.log('nameTable', nameTable[i]);
              myList.push({
                id: i,
                name: nameTable[i],
                balance: res / 1000000000000000000,
                value: Number(valueTemp[i]) / 1000000000000000000,
              });
            }
          })
        ); // array 삽입);
      }
      // const res = await Promise.all(tokenPriceList);
      // 위의 포문으로 배열 i개 삽입 후 setMyList
      // Promise.all(p[1], p[2]);
      setMyList(myList);
    };
    const getPoolList = async () => {
      // 각 pool에 balanceOf를 통해 Lp토큰을 확인 후, 보유중인 list를 {name: kSSE, lpAmount: lp토큰 수량}의 list로 저장
      const promiseGetEachBalance: Array<Promise<any>> = [];
      const poolToSearch: any = [];
      Object.entries(exchangeAddressTable).forEach((pair: Array<string>) => {
        // pair[0] key, pair[1] value
        promiseGetEachBalance.push(
          callContract({
            contractName: 'Exchange',
            contractAddress: pair[1],
            methodName: 'balanceOf',
            parameters: [window.klaytn.selectedAddress],
          }).then((res) => {
            if (res > 0) {
              poolToSearch.push({ name: pair[0], lpAmount: res });
            }

            // console.log(pair[0], ' Exchange balance is ', res);
          })
        );
      });
      await Promise.all(promiseGetEachBalance);
      console.log('Pool to search list :', poolToSearch);

      // list 중 하나를 뽑아와 pool내 klay, pool내 kStock토큰수, total LP를 뽑은 후 {name: kSSE, lpAmount: 100, poolKlay: 10000, poolKStock: 200, totalSupply: 200}
      // poolToSearh :[{name: kSSE, lpAmount: lp토큰 수량}, ... ]
      // const promiseList: any = [];
      const myTempPool: any = [];

      poolToSearch.forEach(async (item: any, index: number) => {
        const promiseTemp: Array<Promise<any>> = [];

        // 1.pool내 klay
        let poolKlay: string;
        promiseTemp.push(
          getBalance({
            address: exchangeAddressTable[item.name],
          }).then((res) => {
            poolKlay = res;
          })
        );

        // 2.pool내 kStock토큰 수
        let poolKStock: string;
        promiseTemp.push(
          callContract({
            contractName: 'KStockToken',
            contractAddress: kStockTokenAddressTable[item.name],
            methodName: 'balanceOf',
            parameters: [exchangeAddressTable[item.name]],
          }).then((res) => {
            poolKStock = res;
          })
        );

        // 3.totalLP
        let totalLP: string;
        promiseTemp.push(
          callContract({
            contractName: 'Exchange',
            contractAddress: exchangeAddressTable[item.name],
            methodName: 'totalSupply',
          }).then((res) => {
            totalLP = res;
          })
        );

        // 모두 가져온 후 push
        Promise.all(promiseTemp).then(() => {
          console.log('Pool promise', promiseTemp);
          const ratio = Number(item.lpAmount) / Number(totalLP);
          myTempPool.push({
            id: index,
            name: item.name,
            lpToken: caver.utils.convertFromPeb(
              item.lpAmount.slice(0, -15),
              'kpeb'
            ), // 소숫점 3개 버림
            balance: `${(
              (Number(poolKlay) * ratio) /
              1000000000000000000
            ).toLocaleString('ko-KR')}KLY + ${(
              (Number(poolKStock) * ratio) /
              1000000000000000000
            ).toLocaleString('ko-KR')}${item.name} `,
          });
          console.log('myTempPool', myTempPool);
          setMyPoolList([...myTempPool]);
          console.log('myPoolList', myPoolList);
        });
      });
    };

    // Promise.all(promiseList).then(() => {
    //   console.log('dd Pool');
    // });

    // list 중 하나를 뽑아와 ROI 계산
    //     위의 데이터를 가지고 myPoolList에 push({id: , name:, value:(KLY + kSSE), ROI})

    getMyList();
    getPoolList();
  }, [window.klaytn.selectedAddress]);

  return (
    <div>
      <MyPageWrapper>
        <h2 className="tit">My Assets</h2>
        <MyPageList>
          <div>
            <div>Token</div>
            <div>Balance</div>
            <div>Value</div>
            <div>Total</div>
          </div>
          {myList
            .sort((a, b) => a.id - b.id)
            .map((el) => (
              <MyPageItem>
                <div>
                  <StockLogo stockName={el.name} />
                  {el.name}
                </div>
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
            <div>Pool</div>
            <div>LPToken</div>
            <div>Balance</div>
            <div>ROI</div>
          </div>
          {myPoolList
            .sort((a, b) => a.id - b.id)
            .map(({ id, ...el }) => (
              <MyPagePoolItem key={id} id={id} {...el} />
            ))}
        </MyPageList>
        <h2>Govern</h2>
        <MyPageList>
          <div>
            <div>Gover ID</div>
            <div>End Time</div>
          </div>
          <MyPageGovern />
        </MyPageList>
      </MyPageWrapper>
    </div>
  );
};

export default MyPage;
