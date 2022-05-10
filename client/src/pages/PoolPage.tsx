import React from 'react';

import { PoolPageWrapper, PoolPageList } from './PoolPage.styles';

const PoolPage = () => {
  return (
    <PoolPageWrapper>
      <h2>Pool</h2>
      <PoolPageList>
        <div>
          <div>Pair name</div>
          <div>유동성규모</div>
          <div>예상 수익률</div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </PoolPageList>
    </PoolPageWrapper>
  );
};

export default PoolPage;
