import React, { useState, useEffect } from 'react';
import Caver from 'caver-js';

import {
  PoolPageWrapper,
  PoolPageList,
  PoolPageItem,
} from './styles/PoolPage.styles';

import { createPoolList } from '../utils/dummyCreator';
import { callContract, sendContract, getBalance } from '../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../constants';

const caver = new Caver(window.klaytn);

interface PoolListProps {
  id: number;
  name: string;
  liquid: number;
  change: number;
}

const PoolPage = () => {
  // const poolList = createPoolList(20);
  const [poolList, setPoolList] = useState<Array<PoolListProps>>([]);

  useEffect(() => {
    const callPoolList = async () => {
      const tempList = [];
      for (let i = 0; i < Object.keys(exchangeAddressTable).length; i++) {
        const klayBalance = await getBalance({
          address: exchangeAddressTable[Object.keys(exchangeAddressTable)[i]],
        });

        const tokenBalance = await callContract({
          contractName: 'KStockToken',
          contractAddress:
            kStockTokenAddressTable[Object.keys(exchangeAddressTable)[i]], // 컨트랙트 배포주소
          methodName: 'balanceOf',
          parameters: [
            exchangeAddressTable[Object.keys(exchangeAddressTable)[i]],
          ], // 인자값 balanceOf(address aacount)
        });

        const pool = {
          id: i,
          name: Object.keys(exchangeAddressTable)[i],
          liquid:
            ((Number(klayBalance) / 1000000000000000000) * tokenBalance) /
            1000000000000000000,
          change: 1,
        };
        tempList.push(pool);
      }
      setPoolList(tempList);
    };
    callPoolList();
  }, []);

  // const tempList = [];

  const handler = async () => {
    // exchagne
    // tokenContract balnce 전체
    // Pool 이름
    // Pool 규모
    // Pool 수익률

    const tempList = [];
    for (let i = 0; i < Object.keys(exchangeAddressTable).length; i++) {
      const klayBalance = await getBalance({
        address: exchangeAddressTable[Object.keys(exchangeAddressTable)[i]],
      });

      const tokenBalance = await callContract({
        contractName: 'KStockToken',
        contractAddress:
          kStockTokenAddressTable[Object.keys(exchangeAddressTable)[i]], // 컨트랙트 배포주소
        methodName: 'balanceOf',
        parameters: [
          exchangeAddressTable[Object.keys(exchangeAddressTable)[i]],
        ], // 인자값 balanceOf(address aacount)
      });

      const pool = {
        id: i,
        name: Object.keys(exchangeAddressTable)[i],
        liquid:
          ((Number(klayBalance) / 1000000000000000000) * tokenBalance) /
          1000000000000000000,
        change: 1,
      };
      tempList.push(pool);
    }
    console.log(Object.keys(exchangeAddressTable)[0]);
    console.log('tempList', tempList);

    // const result = await callContract({
    //   contractName: 'Oracle',
    //   contractAddress: '0xDD776448ded1cAc2108817bAe89fDc72c24474f1',
    //   methodName: 'getStockCodeList',
    // });
    // console.log('result1', result);

    // // 풀 크기
    // // klay
    // // exchange kSSE
    // const result2 = await getBalance({
    //   address: '0x5456540AaBd10Eb07b92aF271072027f1f72b3dC',
    // });
    // console.log('result2', Number(result2) / 1000000000000000000);

    // // token
    // // kStocktoken kSSE
    // const result3 = await callContract({
    //   contractName: 'KStockToken',
    //   contractAddress: '0x58791638902535f1Cfc0004453B0A09bFC50B7bE', // 컨트랙트 배포주소
    //   methodName: 'balanceOf',
    //   parameters: ['0x5456540AaBd10Eb07b92aF271072027f1f72b3dC'], // 인자값 balanceOf(address aacount)
    // });
    // console.log('result3', Number(result3) / 1000000000000000000);

    // const result4 = await caver.klay.getBalance(
    //   '0x23C9436D81b945449AD44efB657E576F189c4264'
    // );
    // console.log('result4', result4);
  };

  return (
    <PoolPageWrapper>
      <h2>Pool</h2>
      <PoolPageList>
        <div>
          <div>Pair name</div>
          <div>유동성 규모</div>
          <div>수익률</div>
        </div>
        {poolList.map((el) => (
          <PoolPageItem key={el.id}>
            <div>{el.name}</div>
            <div className="main__oracle">
              {el.liquid.toLocaleString('ko-KR')}
            </div>
            <div>{el.change}%</div>
          </PoolPageItem>
        ))}
      </PoolPageList>
      <button onClick={handler}>안녕</button>
    </PoolPageWrapper>
  );
};

export default PoolPage;
