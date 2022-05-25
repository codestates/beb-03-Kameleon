import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/LiquidityInput.styles';

import { getBalance } from '../../utils/KAS';

import useInput from '../../hooks/useInput';
import { callContract } from '../../utils/KAS';
import { kStockTokenAddressTable } from '../../constants';

interface LayoutProps {
  children: React.ReactNode;
  liftState: (
    value: string,
    isChange: boolean,
    isDecimalError: boolean
  ) => void;
  otherBalance: number;
  otherChange: boolean;
  isKlay: boolean;
  ratio: number;
  numberOfDecimal: number;
}

const LiquidityInput = ({
  children,
  liftState,
  otherBalance,
  otherChange,
  isKlay,
  ratio,
  numberOfDecimal,
}: LayoutProps) => {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [maxBalance, setMaxBalance] = useState<number>(0);
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
    // 이름 정하기
    if (id !== undefined) {
      setName(id);
    }
  }, [id]);

  useEffect(() => {
    // name을 확인 후 초기값 설정
    // maxBalance, numberofDecimal
    if (window.klaytn.selectedAddress) {
      if (isKlay) {
        getBalance({ address: window.klaytn.selectedAddress }).then((res) => {
          setMaxBalance(Number((Number(res) / 1000000000000000000).toFixed(2)));
        });
      } else if (name !== undefined) {
        callContract({
          contractName: 'KStockToken',
          contractAddress: kStockTokenAddressTable[name],
          methodName: 'balanceOf',
          parameters: [window.klaytn.selectedAddress],
        }).then((res) =>
          setMaxBalance(Number((res / 1000000000000000000).toFixed(6)))
        );
      }
    }
  }, [name, isKlay]);

  useEffect(() => {
    liftState(tokenBalance, isChange, isDecimalError);
  }, [liftState, tokenBalance, isChange, isDecimalError]);

  useEffect(() => {
    if (otherChange && isKlay) {
      const [, decimal] = String(otherBalance / ratio / 1.01).split('.');
      if (decimal && decimal.length > numberOfDecimal) {
        setTokenBalance((otherBalance / ratio / 1.01).toFixed(numberOfDecimal));
      } else {
        setTokenBalance(String(otherBalance / ratio / 1.01));
      }
      setIsChange(false);
    } else if (otherChange && !isKlay) {
      const [, decimal] = String(otherBalance * ratio * 1.01).split('.');
      if (decimal && decimal.length > numberOfDecimal) {
        setTokenBalance((otherBalance * ratio * 1.01).toFixed(numberOfDecimal));
      } else {
        setTokenBalance(String(otherBalance * ratio * 1.01));
      }
      setIsChange(false);
    }
  }, [
    otherChange,
    otherBalance,
    isKlay,
    ratio,
    numberOfDecimal,
    setIsChange,
    setTokenBalance,
  ]);

  return (
    <SingleInputContainer
      isFocus={isFocus}
      isError={isBlankError || isDecimalError}
    >
      <div>
        <section>
          <label htmlFor={name + isKlay}>{children}</label>
          {children === 'INPUT' && (
            <label htmlFor={name + isKlay}>Max {maxBalance}</label>
          )}
        </section>
        <SingleInputWrapper>
          <section>
            <div>{isKlay ? 'KLAY' : name}</div>
          </section>
          <input
            placeholder="0.00"
            id={name + isKlay}
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

export default LiquidityInput;
