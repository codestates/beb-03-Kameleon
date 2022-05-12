import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import {
  MintPageWrapper,
  TabStyle,
  DetailInfoStyle,
  IconWrapper,
} from './styles/MintPage.styles';

import SingleInput from '../components/Input/SingleInput';
import MultipleInput from '../components/Input/MultipleInput';

const arrowDown = faArrowDown as IconProp;

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
            <SingleInput>INPUT</SingleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <MultipleInput>OUTPUT</MultipleInput>
            <button type="button">발행하기</button>
          </>
        ) : (
          <>
            <MultipleInput>INPUT</MultipleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <SingleInput>OUTPUT</SingleInput>
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
            <button type="button">소각하기</button>
          </>
        )}
      </form>
    </MintPageWrapper>
  );
};

export default SwapPage;
