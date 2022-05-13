import React from 'react';

import {
  MyPageWrapper,
  MyPageList,
  MyPageItem,
  MyPageBar,
} from './MyPage.styles';

import {
  createMyList,
  createMyPollList,
  createMyGovernList,
} from '../utils/dummyCreator';

const MyPage = () => {
  const myList = createMyList(5);
  const myPoolList = createMyPollList(5);
  const myGovernList = createMyGovernList(5);

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
