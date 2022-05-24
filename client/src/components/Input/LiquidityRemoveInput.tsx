import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/LiquidityRemoveInput.styles';

import { getBalance } from '../../utils/KAS';

import useInput from '../../hooks/useInput';
import { callContract } from '../../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../../constants';

const caver = new Caver(window.klaytn);

interface LayoutProps {
  children: React.ReactNode;
  liftState: (
    value: string,
    isChange: boolean,
    isDecimalError: boolean
  ) => void;
}

const LiquidityRemoveInput = ({ children, liftState }: LayoutProps) => {
  const { id } = useParams();
  const [name, setName] = useState<string>('');
  const [numberOfDecimal, setNumberOfDecimal] = useState<number>(6);
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
    // 0. lpToken 보유량
    if (window.klaytn.selectedAddress) {
      callContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'balanceOf',
        parameters: [window.klaytn.selectedAddress],
      })
        .then((res) => {
          setMaxBalance(Number((Number(res) / 1000000000000000000).toFixed(6)));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [name, window.klaytn.selectedAddress]);

  useEffect(() => {
    liftState(tokenBalance, isChange, isDecimalError);
  }, [liftState, tokenBalance, isChange, isDecimalError]);

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
            <div>KLAY + {name} LPT</div>
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

export default LiquidityRemoveInput;
