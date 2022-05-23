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
import axios from 'axios';

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
      const exchangeAddressList = Object.keys(exchangeAddressTable);
      for (let i = 0; i < exchangeAddressList.length; i++) {
        const klayBalance = await getBalance({
          address: exchangeAddressTable[exchangeAddressList[i]],
        });

        const tokenBalance = await callContract({
          contractName: 'KStockToken',
          contractAddress: kStockTokenAddressTable[exchangeAddressList[i]], // 컨트랙트 배포주소
          methodName: 'balanceOf',
          parameters: [exchangeAddressTable[exchangeAddressList[i]]], // 인자값 balanceOf(address aacount)
        });
        const {
          data: { success, data },
        } = await axios.get(`http://localhost:4001/api/contract/getPoolRoi`, {
          params: {
            exchangeAddress: exchangeAddressTable[exchangeAddressList[i]],
          },
        });
        const pool = {
          id: i,
          name: exchangeAddressList[i],
          liquid:
            ((Number(klayBalance) / 1000000000000000000) * tokenBalance) /
            1000000000000000000,
          change: data.roi,
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
          <div>수익률(ROI)</div>
        </div>
        {poolList.map((el) => (
          <Link to={`/liquidity/${el.name}`}>
            <PoolPageItem key={el.id}>
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
