import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/LiquidityInput.styles';

import { getBalance } from '../../utils/KAS';

import useInput from '../../hooks/useInput';
import { callContract } from '../../utils/KAS';
import { kStockTokenAddressTable } from '../../constants';

const caver = new Caver(window.klaytn);

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
}

const LiquidityInput = ({
  children,
  liftState,
  otherBalance,
  otherChange,
  isKlay,
  ratio,
}: LayoutProps) => {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [numberOfDecimal, setNumberOfDecimal] = useState<number>(0);
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
    if (isKlay) {
      getBalance({ address: window.klaytn.selectedAddress }).then((res) => {
        setMaxBalance(Number((Number(res) / 1000000000000000000).toFixed(2)));
      });
      setNumberOfDecimal(2);
    } else if (name !== undefined) {
      callContract({
        contractName: 'KStockToken',
        contractAddress: kStockTokenAddressTable[name],
        methodName: 'balanceOf',
        parameters: [window.klaytn.selectedAddress],
      }).then((res) =>
        setMaxBalance(Number((res / 1000000000000000000).toFixed(6)))
      );
      setNumberOfDecimal(6);
    }
  }, [name]);

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
  }, [otherBalance, isKlay, ratio, setIsChange]);

  // console.log(ratio);

  // useEffect(() => {
  //   if (otherChange && (otherBalance * otherPrice) / tokenPrice !== 0) {
  //     const [, decimal] = String(
  //       (otherBalance * otherPrice) / tokenPrice
  //     ).split('.');
  //     if (decimal && decimal.length > numberOfDecimal) {
  //       setTokenBalance(
  //         String(
  //           ((otherBalance * otherPrice) / tokenPrice).toFixed(numberOfDecimal)
  //         )
  //       );
  //     } else {
  //       setTokenBalance(String((otherBalance * otherPrice) / tokenPrice));
  //     }
  //     setIsChange(false);
  //   }
  // }, [
  //   otherChange,
  //   otherBalance,
  //   otherPrice,
  //   tokenPrice,
  //   setTokenBalance,
  //   setIsChange,
  // ]);
  // useEffect(() => {
  //   const callAmount = async () => {
  //     const result = await callContract({
  //       contractName: 'Exchange',
  //       contractAddress: exchangeAddressTable[name],
  //       methodName: 'getMinimumTokenAmountToAddLiquidity',
  //       parameters: [2],
  //     });

  //     console.log('result', result);
  //   };

  //   if (otherChange) {
  //     // c;
  //     console.log('1');
  //     callAmount();
  //   }
  // }, [otherChange]);

  return (
    <SingleInputContainer
      isFocus={isFocus}
      isError={isBlankError || isDecimalError}
    >
      <div>
        <section>
          <label htmlFor="input">{children}</label>
          {children === 'INPUT' && (
            <label htmlFor="input">Max {maxBalance}</label>
          )}
        </section>
        <SingleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>{isKlay ? 'KLAY' : name}</div>
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

export default LiquidityInput;
