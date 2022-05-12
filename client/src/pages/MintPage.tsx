import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import {
  MintPageWrapper,
  TabStyle,
  DetailInfoStyle,
  IconWrapper,
  ButtonWrapper,
} from './styles/MintPage.styles';

import SingleInput from '../components/Input/SingleInput';
import MultipleInput from '../components/Input/MultipleInput';

const arrowDown = faArrowDown as IconProp;

const MintPage = () => {
  const [tab, setTab] = useState<string>('mint');
  const [valueA, setValueA] = useState<string>('');
  const [valueB, setValueB] = useState<string>('');
  const [nameA, setNameA] = useState<string>('');
  const [nameB, setNameB] = useState<string>('');
  const [isDecimalErrorA, setIsDecimalErrorA] = useState<boolean>(false);
  const [isDecimalErrorB, setIsDecimalErrorB] = useState<boolean>(false);

  const clickButton = useCallback(() => {
    console.log('button click');
  }, []);

  const liftStateA = useCallback(
    (value: string, name: string, isDecimalError: boolean) => {
      console.log('1');
      setValueA(value);
      setNameA(name);
      setIsDecimalErrorA(isDecimalError);
    },
    []
  );

  const liftStateB = useCallback(
    (value: string, name: string, isDecimalError: boolean) => {
      setValueB(value);
      setNameB(name);
      setIsDecimalErrorB(isDecimalError);
    },
    []
  );

  console.log('mintA', Number(valueA), nameA, isDecimalErrorA);
  console.log('mintB', Number(valueB), nameB, isDecimalErrorB);

  // Number로 형식 변환
  // 0 보다 클때
  // 소수점 확인 알아서해줌 ex) 4. => 4

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
            <SingleInput liftState={liftStateA}>INPUT</SingleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <MultipleInput liftState={liftStateB}>OUTPUT</MultipleInput>
            <ButtonWrapper
              numberA={Number(valueA)}
              numberB={Number(valueB)}
              isErrorA={isDecimalErrorA}
              isErrorB={isDecimalErrorB}
              type="button"
            >
              발행하기
            </ButtonWrapper>
          </>
        ) : (
          <>
            <MultipleInput liftState={liftStateB}>INPUT</MultipleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <SingleInput liftState={liftStateA}>OUTPUT</SingleInput>
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
            <ButtonWrapper
              numberA={Number(valueA)}
              numberB={Number(valueB)}
              isErrorA={isDecimalErrorA}
              isErrorB={isDecimalErrorB}
              type="button"
              onClick={clickButton}
            >
              소각하기
            </ButtonWrapper>
          </>
        )}
      </form>
    </MintPageWrapper>
  );
};

export default MintPage;
