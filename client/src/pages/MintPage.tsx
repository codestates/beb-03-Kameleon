import React, { useState } from 'react';
import {
  MintPageWrapper,
  TabStyle,
  InputStyle,
  DetailInfoStyle,
} from './styles/MintPage.styles';

const SwapPage = () => {
  const [tab, setTab] = useState('mint');

  return (
    <MintPageWrapper>
      <h2>Mint & Burn</h2>
      <TabStyle>
        <button
          type="button"
          onClick={() => setTab('mint')}
          className={tab === 'mint' ? 'on' : ''}
        >
          발행
        </button>
        <button
          type="button"
          onClick={() => setTab('burn')}
          className={tab === 'burn' ? 'on' : ''}
        >
          소각
        </button>
      </TabStyle>
      <form action="">
        {tab === 'mint' ? (
          <>
            <div>
              <InputStyle>
                <div>
                  <span>
                    KLAY -&gt;
                    <button type="button"> Token1</button>
                  </span>
                </div>
                <div>
                  <label htmlFor="mintInput">Input</label>
                  <span>
                    <input type="number" id="mintInput" placeholder="00000" />
                  </span>
                </div>
                <dl>
                  <dt>Output</dt>
                  <dd>0000 kSAMSUMG</dd>
                </dl>
              </InputStyle>
            </div>
            <button type="button">발행하기</button>
          </>
        ) : (
          <>
            <div>
              <InputStyle>
                <div>
                  <label htmlFor="input">kSAMSUNG Token</label>
                  <span>
                    <input type="number" id="input" placeholder="00000" />
                  </span>
                </div>
                <dl>
                  <dt>Output</dt>
                  <dd>0000 kSAMSUMG</dd>
                </dl>
              </InputStyle>
              <DetailInfoStyle>
                <div>
                  <dt>Exchange Rate</dt>
                  <dd>1 KLAY = 1000 KMT</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>0.001KLAY</dd>
                </div>
              </DetailInfoStyle>
            </div>
            <button type="button">소각하기</button>
          </>
        )}
      </form>
    </MintPageWrapper>
  );
};

export default SwapPage;
