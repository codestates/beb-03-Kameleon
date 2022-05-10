import React from 'react';

import { MyPageWrapper, MyPageList, MyPageBar } from './MyPage.styles';

const MyPage = () => {
  const yes = 50;
  const no = 20;

  return (
    <div>
      <MyPageWrapper>
        <h2>자산</h2>
        <MyPageList>
          <div>
            <div>Ticker</div>
            <div>Balance</div>
            <div>Value</div>
            <div>total: 10KKT</div>
          </div>
          <div></div>
          <div></div>
        </MyPageList>
        <h2>Pool</h2>
        <MyPageList>
          <div>
            <div>Pool ID</div>
            <div>Balance</div>
            <div>Value</div>
            <div>total: 10KKT</div>
          </div>
          <div></div>
          <div></div>
        </MyPageList>
        <h2>Govern</h2>
        <MyPageList>
          <div>
            <div>Gover ID</div>
            <div>End Time</div>
          </div>
          <div>
            <div>삼성전자 토큰 폐지</div>
            <MyPageBar yes={yes} no={no}>
              <div></div>
              <div></div>
            </MyPageBar>
            <div>2022-05-20</div>
          </div>
          <div></div>
        </MyPageList>
      </MyPageWrapper>
    </div>
  );
};

export default MyPage;
