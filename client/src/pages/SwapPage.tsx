import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
// import samsungLogo from '../assets/images/samsung-logo.png';
import {
  SwapPageWrapper,
  DetailInfoStyle,
  IconWrapper,
  ButtonWrapper,
} from './styles/SwapPage.styles';

import MultipleInput from '../components/Input/MultipleInput';

const arrowDown = faArrowDown as IconProp;

const SwapPage = () => {
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

  return (
    <SwapPageWrapper>
      <h2>Swap</h2>
      <form action="">
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
        <MultipleInput
          liftState={liftStateB}
          otherBalance={Number(balanceA)}
          otherPrice={priceA}
          otherChange={isChangeA}
        >
          OUTPUT
        </MultipleInput>
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
        <ButtonWrapper
          numberA={Number(balanceA)}
          numberB={Number(balanceB)}
          isErrorA={isDecimalErrorA}
          isErrorB={isDecimalErrorB}
          type="button"
          onClick={clickButton}
        >
          스왑하기
        </ButtonWrapper>
      </form>
    </SwapPageWrapper>
  );
};

export default SwapPage;
