import React, { useEffect } from 'react';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/SingleInput.styles';

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
  const tokenPrice = 500;
  const tokenName = 'KLAY';
  const numberOfDecimal = 2;
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
        <label htmlFor="input">{children}</label>
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
