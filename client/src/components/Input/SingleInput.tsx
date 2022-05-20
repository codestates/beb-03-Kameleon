import React, { useState, useEffect } from 'react';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/SingleInput.styles';

import { getBalance } from '../../utils/KAS';

import useInput from '../../hooks/useInput';

interface LayoutProps {
  children: React.ReactNode;
  liftState: (
    value: string,
    price: number,
    name: string,
    isChange: boolean,
    isDecimalError: boolean
  ) => void;
  otherBalance: number;
  otherPrice: number;
  otherChange: boolean;
}

const SingleInput = ({
  children,
  liftState,
  otherBalance,
  otherPrice,
  otherChange,
}: LayoutProps) => {
  // 임혁진 수정 tokenPrice = 1
  const tokenPrice = 1;
  const tokenName = 'KLAY';
  const numberOfDecimal = 2;
  const [maxValue, setMaxValue] = useState<number>(0);
  const {
    tokenBalance,
    isFocus,
    isBlankError,
    isDecimalError,
    isChange,
    setIsChange,
    setTokenBalance,
    setKey,
    setIsFocus,
    changeInput,
  } = useInput(numberOfDecimal);

  useEffect(() => {
    // 임혁진 수정
    getBalance({ address: window.klaytn.selectedAddress }).then((res) => {
      console.log('&&&&&&&&&&&&&&&&&7' + res);
      setMaxValue(Number(res) / 1000000000000000000);
    });
    // setTokenList(createTokenList(5));
  }, []);

  useEffect(() => {
    liftState(tokenBalance, tokenPrice, tokenName, isChange, isDecimalError);
  }, [liftState, tokenBalance, isChange, isDecimalError]);

  useEffect(() => {
    if (otherChange && (otherBalance * otherPrice) / tokenPrice !== 0) {
      const [, decimal] = String(
        (otherBalance * otherPrice) / tokenPrice
      ).split('.');
      if (decimal && decimal.length > numberOfDecimal) {
        setTokenBalance(
          String(
            ((otherBalance * otherPrice) / tokenPrice).toFixed(numberOfDecimal)
          )
        );
      } else {
        setTokenBalance(String((otherBalance * otherPrice) / tokenPrice));
      }
      setIsChange(false);
    }
  }, [
    otherChange,
    otherBalance,
    otherPrice,
    tokenPrice,
    setTokenBalance,
    setIsChange,
  ]);

  return (
    <SingleInputContainer
      isFocus={isFocus}
      isError={isBlankError || isDecimalError}
    >
      <div>
        <section>
          <label htmlFor="input">{children}</label>
          {children === 'INPUT' && (
            <label htmlFor="input">Max {maxValue}</label>
          )}
        </section>
        <SingleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>KLAY</div>
          </section>
          <input
            placeholder="0.00"
            id="input"
            autoComplete="off"
            value={tokenBalance}
            onKeyDown={(e) => setKey(e.key)}
            onChange={(e) => changeInput(e)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </SingleInputWrapper>
      </div>
      {/* 에러 메세지 */}
      {isDecimalError && (
        <section>
          Amount must be within {numberOfDecimal} decimal points
        </section>
      )}
      {isBlankError && <section>Required</section>}
    </SingleInputContainer>
  );
};

export default SingleInput;
