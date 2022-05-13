import React from 'react';

import { PoolPageWrapper, PoolPageList, PoolPageItem } from './PoolPage.styles';

import { createPoolList } from '../utils/dummyCreator';

const PoolPage = () => {
  const poolList = createPoolList(20);

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
    </PoolPageWrapper>
  );
};

export default PoolPage;
