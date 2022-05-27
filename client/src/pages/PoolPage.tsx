import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  PoolPageWrapper,
  PoolPageList,
  PoolPageItem,
} from './styles/PoolPage.styles';

import { callContract, getBalance } from '../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../constants';
import StockLogo from '../components/StockLogo/StockLogo';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface PoolListProps {
  id: number;
  name: string;
  liquid: number;
  change: number;
}

const PoolPage = () => {
  const [poolList, setPoolList] = useState<{
    poolList: Array<PoolListProps>;
    isLoading: boolean;
  }>({
    poolList: [],
    isLoading: true,
  });

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
          data: { data },
        } = await axios.get(`/api/contract/getPoolRoi`, {
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
      setPoolList({ poolList: tempList, isLoading: false });
    };
    callPoolList();
  }, []);

  return (
    <PoolPageWrapper>
      <h2 className="tit">Pool</h2>
      <PoolPageList>
        <div>
          <span>Name</span>
          <span>Volume</span>
          <span>
            APY<i>(ROI)</i>
          </span>
        </div>
        {poolList?.isLoading === true && (
          <SkeletonTheme height={'50px'}>
            <p>
              <Skeleton count={5}></Skeleton>
            </p>
          </SkeletonTheme>
        )}
        {poolList?.isLoading === false &&
          poolList?.poolList?.map((el) => (
            <Link to={`/liquidity/${el.name}`} key={el.id}>
              <PoolPageItem>
                <div>
                  <StockLogo stockName={el.name} /> {el.name} {'<->'}{' '}
                  <StockLogo stockName="KLAY" />
                  {'KLAY'}
                </div>
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
