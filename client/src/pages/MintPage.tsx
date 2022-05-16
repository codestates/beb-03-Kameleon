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
  const [balanceA, setBalanceA] = useState<string>('');
  const [balanceB, setBalanceB] = useState<string>('');
  const [priceA, setPriceA] = useState<number>(0);
  const [priceB, setPriceB] = useState<number>(0);
  const [nameA, setNameA] = useState<string>('');
  const [nameB, setNameB] = useState<string>('');
  const [isChangeA, setIsChangeA] = useState<boolean>(false);
  const [isChangeB, setIsChangeB] = useState<boolean>(false);
  const [isDecimalErrorA, setIsDecimalErrorA] = useState<boolean>(false);
  const [isDecimalErrorB, setIsDecimalErrorB] = useState<boolean>(false);

  const liftStateA = useCallback(
    (
      balance: string,
      price: number,
      name: string,
      isChange: boolean,
      isDecimalError: boolean
    ) => {
      setBalanceA(balance);
      setPriceA(price);
      setNameA(name);
      setIsChangeA(isChange);
      setIsDecimalErrorA(isDecimalError);
    },
    []
  );

  const liftStateB = useCallback(
    (
      balance: string,
      price: number,
      name: string,
      isChange: boolean,
      isDecimalError: boolean
    ) => {
      setBalanceB(balance);
      setPriceB(price);
      setNameB(name);
      setIsChangeB(isChange);
      setIsDecimalErrorB(isDecimalError);
    },
    []
  );

  const clickButton = useCallback(() => {
    console.log('button click', nameA, nameB);
  }, [nameA, nameB]);

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
            <SingleInput
              liftState={liftStateA}
              otherBalance={Number(balanceB)}
              otherPrice={priceB}
              otherChange={isChangeB}
            >
              INPUT
            </SingleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <MultipleInput
              liftState={liftStateB}
              otherBalance={Number(balanceA)}
              otherPrice={priceA}
              otherChange={isChangeA}
            >
              OUTPUT
            </MultipleInput>
            <ButtonWrapper
              numberA={Number(balanceA)}
              numberB={Number(balanceB)}
              isErrorA={isDecimalErrorA}
              isErrorB={isDecimalErrorB}
              type="button"
            >
              발행하기
            </ButtonWrapper>
          </>
        ) : (
          <>
            <MultipleInput
              liftState={liftStateA}
              otherBalance={Number(balanceB)}
              otherPrice={priceB}
              otherChange={isChangeB}
            >
              INPUT
            </MultipleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <SingleInput
              liftState={liftStateB}
              otherBalance={Number(balanceA)}
              otherPrice={priceA}
              otherChange={isChangeA}
            >
              OUTPUT
            </SingleInput>
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
              numberA={Number(balanceA)}
              numberB={Number(balanceB)}
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
