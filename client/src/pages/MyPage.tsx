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
  const yes = 50;
  const no = 20;

  const myList = createMyList(5);
  const myPoolList = createMyPollList(5);
  const myGovernList = createMyGovernList(5);

  console.log(myGovernList);

  return (
    <div>
      <MyPageWrapper>
        <h2>자산</h2>
        <MyPageList>
          <div>
            <div>Ticker ID</div>
            <div>Balance</div>
            <div>Value</div>
            <div>total: 10KKT</div>
          </div>
          {myList.map((el) => (
            <MyPageItem>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.balance.toLocaleString('ko-KR')}
              </div>
              <div>{el.value.toLocaleString('ko-KR')}</div>
              <div>{(el.balance * el.value).toLocaleString('ko-KR')}</div>
            </MyPageItem>
          ))}
        </MyPageList>
        <h2>Pool</h2>
        <MyPageList>
          <div>
            <div>Pool ID</div>
            <div>Balance</div>
            <div>Value</div>
            <div>total: 10KKT</div>
          </div>
          {myPoolList.map((el) => (
            <MyPageItem>
              <div>{el.name}</div>
              <div className="main__oracle">
                {el.balance.toLocaleString('ko-KR')}
              </div>
              <div>{el.value.toLocaleString('ko-KR')}</div>
              <div>{(el.balance * el.value).toLocaleString('ko-KR')}</div>
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
          {/* <div>
            <div>삼성전자 토큰 폐지</div>
            <MyPageBar yes={yes} no={no}>
              <div></div>
              <div></div>
            </MyPageBar>
            <div>2022-05-20</div>
          </div>
          <div></div> */}
        </MyPageList>
      </MyPageWrapper>
    </div>
  );
};

export default MyPage;
