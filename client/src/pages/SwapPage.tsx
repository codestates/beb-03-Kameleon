import React from 'react';
import samsungLogo from '../assets/images/samsung-logo.png';
import {
  SwapPageWrapper,
  InputStyle,
  DetailInfoStyle,
} from './styles/SwapPage.styles';

const SwapPage = () => {
  return (
    <SwapPageWrapper>
      <h2>Swap</h2>
      <form action="">
        <InputStyle>
          <label htmlFor="sellToken">1. 지불할 토큰을 선택하세요</label>
          <div>
            <button type="button">
              <img src={samsungLogo} alt="token type" />
              Token1
            </button>
            <input type="number" id="sellToken" placeholder="00000" />
          </div>
        </InputStyle>
        <InputStyle>
          <label htmlFor="buyToken">2. 받을 토큰을 선택하세요</label>
          <div>
            <button type="button">
              <img src={samsungLogo} alt="token type" />
              Token1
            </button>
            <input type="number" id="buyToken" placeholder="00000" />
          </div>
        </InputStyle>
        <DetailInfoStyle>
          <div>
            <dt>현재 가격</dt>
            <dd>0000000 KRW</dd>
          </div>
          <div>
            <dt>수수료</dt>
            <dd>0.00 KKT</dd>
          </div>
        </DetailInfoStyle>
        <button type="button">지갑 연결 / Swap</button>
      </form>
    </SwapPageWrapper>
  );
};

export default SwapPage;
