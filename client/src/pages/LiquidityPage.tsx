import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  LiquidityPageWrapper,
  TabStyle,
  InputStyle,
  DetailInfoStyle,
} from './styles/LiquidityPage.styles';

const LiquidityPage = () => {
  const [tab, setTab] = useState('deposit');

  return (
    <LiquidityPageWrapper>
      <h2>Liquidity</h2>
      <TabStyle>
        <button
          type="button"
          onClick={() => setTab('deposit')}
          className={tab === 'deposit' ? 'on' : ''}
        >
          예치
        </button>
        <button
          type="button"
          onClick={() => setTab('withdrawal')}
          className={tab === 'withdrawal' ? 'on' : ''}
        >
          인출
        </button>
      </TabStyle>
      <form action="">
        {tab === 'deposit' ? (
          <>
            <div>
              <div className="multi-inp">
                <InputStyle>
                  <div>
                    <button type="button">Token 선택</button>
                  </div>
                  <div>
                    <span>
                      <input type="number" id="mintInput" placeholder="00000" />
                    </span>
                  </div>
                </InputStyle>
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <InputStyle>
                  <div>
                    <button type="button">Token 선택</button>
                  </div>
                  <div>
                    <span>
                      <input type="number" id="mintInput" placeholder="00000" />
                    </span>
                  </div>
                </InputStyle>
              </div>
              <DetailInfoStyle>
                <div>
                  <dt>유동성 규모</dt>
                  <dd>000000</dd>
                </div>
              </DetailInfoStyle>
            </div>
            <button type="button">예치하기</button>
          </>
        ) : (
          <>
            <div>
              <InputStyle>
                <div className="single-inp">
                  <label htmlFor="input">kSAMSUNG Token</label>
                  <span>
                    <input type="number" id="input" placeholder="00000" />
                  </span>
                </div>
                <button type="button">Token</button>
                <dl>
                  <dt>Output</dt>
                  <dd>0.0000 ETH + 0.0000 KMT</dd>
                </dl>
              </InputStyle>
              <DetailInfoStyle>
                <div>
                  <dt>Exchange Rate</dt>
                  <dd>1 KLAY = 1000 KMT</dd>
                </div>
                <div>
                  <dt>Current Pool Size</dt>
                  <dd>1 ETH + 1000 KMT</dd>
                </div>
                <div>
                  <dt>Your Pool Share (0.000%)</dt>
                  <dd>1 ETH + 1000 KMT</dd>
                </div>
              </DetailInfoStyle>
            </div>
            <button type="button">인출하기</button>
          </>
        )}
      </form>
    </LiquidityPageWrapper>
  );
};

export default LiquidityPage;
