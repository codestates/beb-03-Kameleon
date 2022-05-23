import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          change: 0, // temp Change
        };
        tempList.push(pool);
      }
      setPoolList(tempList);
    };
    callPoolList();
  }, []);

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
          <Link to={`/liquidity/${el.name}`} key={el.id}>
            <PoolPageItem>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.liquid.toLocaleString('ko-KR')}
              </div>
              <div>{el.change}%</div>
            </PoolPageItem>
          </Link>
        ))}
      </PoolPageList>
    </PoolPageWrapper>
  );
};

export default PoolPage;
