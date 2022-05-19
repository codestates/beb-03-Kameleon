import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import {
  MultipleInputContainer,
  MultipleInputWrapper,
  MultipleInputBlank,
  MultipleInputList,
} from './styles/MultipleInput.styles';

import useInput from '../../hooks/useInput';

import { createTokenList } from '../../utils/dummyCreator';
// 임혁진 수정
import { callContract, getBalance } from '../../utils/KAS';
import {
  contractAddressTable,
  kStockTokenAddressTable,
} from './../../constants';

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

interface TokenListProps {
  id: number;
  name: string;
  krwPrice: number;
}

const angleUp = faAngleUp as IconProp;
const angleDown = faAngleDown as IconProp;

const MultipleInput = ({
  children,
  liftState,
  otherBalance,
  otherPrice,
  otherChange,
}: LayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 선택한 token의 이름, 가격, 수량
  const [tokenName, setTokenName] = useState<string>('SELECT');
  const [tokenPrice, setTokenPrice] = useState<number>(70000000000000000000000);
  const [tokenList, setTokenList] = useState<Array<TokenListProps>>([]);
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
  } = useInput(6);

  useEffect(() => {
    // 임혁진 수정
    callContract({
      contractName: 'Oracle',
      contractAddress: contractAddressTable.Oracle,
      methodName: 'getOraclePrice',
    })
      .then((res) => {
        const tList = new Array<TokenListProps>();
        console.log(res);
        const symbolTable = Object.keys(kStockTokenAddressTable);
        for (let i = 0; i < res.length; i++) {
          const token: TokenListProps = {
            id: i,
            name: symbolTable[i],
            krwPrice: res[i] / 1000000000000000000,
          };
          console.log(typeof res[i]);
          console.log(token);
          tList.push(token);
        }
        console.log('%%%%%%%' + tList);
        return tList;
      })
      .then((tList: Array<TokenListProps>) => {
        console.log(tList);
        setTokenList(tList);
        setTokenName(tList[0].name);
        setTokenPrice(tList[0].krwPrice);
      });

    // setTokenList(createTokenList(5));
  }, []);

  // tokenName 변경에 따라 Max값 변경
  useEffect(() => {
    callContract({
      contractName: 'KStockToken',
      contractAddress: kStockTokenAddressTable[tokenName],
      methodName: 'balanceOf',
      parameters: [window.klaytn.selectedAddress],
    }).then((res) => setMaxValue(res / 1000000000000000000));
  }, [tokenName]);

  useEffect(() => {
    liftState(tokenBalance, tokenPrice, tokenName, isChange, isDecimalError);
  }, [
    liftState,
    tokenBalance,
    tokenPrice,
    tokenName,
    isChange,
    isDecimalError,
  ]);

  useEffect(() => {
    if (otherChange && (otherBalance * otherPrice) / tokenPrice !== 0) {
      const [, decimal] = String(
        (otherBalance * otherPrice) / tokenPrice
      ).split('.');
      if (decimal && decimal.length > 6) {
        setTokenBalance(
          String(((otherBalance * otherPrice) / tokenPrice).toFixed(6))
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

  const clickDownIcon = useCallback(() => {
    setIsOpen(true);
    setIsFocus(true);
  }, [setIsFocus]);

  const clickUpIcon = useCallback(() => {
    setIsOpen(false);
    setIsFocus(false);
  }, [setIsFocus]);

  const clickItem = useCallback((name: string, price: number) => {
    setTokenName(name);
    setTokenPrice(price);
  }, []);

  return (
    <MultipleInputContainer
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
        <MultipleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>{tokenName}</div>
            {isOpen ? (
              <FontAwesomeIcon
                icon={angleUp}
                className="icon"
                onClick={clickUpIcon}
              />
            ) : (
              <FontAwesomeIcon
                icon={angleDown}
                className="icon"
                onClick={clickDownIcon}
              />
            )}
          </section>
          <input
            placeholder="0.000000"
            id="input"
            autoComplete="off"
            value={tokenBalance}
            onKeyDown={(e) => setKey(e.key)}
            onChange={(e) => changeInput(e)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </MultipleInputWrapper>
        {isOpen && (
          <>
            <MultipleInputBlank />
            <MultipleInputList>
              {tokenList.map((el) => (
                <li key={el.id} onClick={() => clickItem(el.name, el.krwPrice)}>
                  {el.name}
                </li>
              ))}
            </MultipleInputList>
          </>
        )}
      </div>
      {/* 에러 메세지 */}
      {isDecimalError && (
        <section>Amount must be within 6 decimal points</section>
      )}
      {isBlankError && <section>Required</section>}
    </MultipleInputContainer>
  );
};

export default MultipleInput;
