import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';

import {
  MultipleInputContainer,
  MultipleInputWrapper,
  MultipleInputBlank,
  MultipleInputList,
} from './styles/MultipleInput.styles';

import useInput, { IUseInput } from '../../hooks/useInput';

import { callContract, getBalance } from '../../utils/KAS';
import { kStockTokenAddressTable, exchangeAddressTable } from '../../constants';

interface TokenListProps {
  id: number;
  name: string;
}

interface ISwapInput extends IUseInput {
  children: React.ReactNode;
  tokenName: string;
  setTokenName: React.Dispatch<React.SetStateAction<string>>;
}

const angleUp = faAngleUp as IconProp;
const angleDown = faAngleDown as IconProp;

const SwapInput = ({
  children,
  tokenName,
  setTokenName,
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
}: ISwapInput) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 선택한 token의 이름, 가격, 수량
  const [tokenList, setTokenList] = useState<Array<TokenListProps>>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  const caver = new Caver('https://api.baobab.klaytn.net:8651');

  const amountKlay = async (token: string, balance: string) => {
    const result = await callContract({
      contractName: 'Exchange',
      contractAddress: `${exchangeAddressTable[token]}`,
      methodName: 'getEthAmount',
      parameters: [caver.utils.convertToPeb(balance, 'KLAY')],
    });
    return result;
  };

  const amountToken = async (token: string, balance: string) => {
    const result = await callContract({
      contractName: 'Exchange',
      contractAddress: `${exchangeAddressTable[token]}`,
      methodName: 'getTokenAmount',
      parameters: [caver.utils.convertToPeb(balance, 'KLAY')],
    });
    return result;
  };

  // selected list 설정
  useEffect(() => {
    const tList = new Array<TokenListProps>();
    const symbolTable = Object.keys(kStockTokenAddressTable);
    for (let i = 0; i < symbolTable.length; i++) {
      const token: TokenListProps = {
        id: i,
        name: symbolTable[i],
      };
      tList.push(token);
    }
    setTokenList(tList);
    setTokenName(params.token ? params.token : tList[0].name);
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

  const clickDownIcon = useCallback(() => {
    setIsOpen(true);
    setIsFocus(true);
  }, [setIsFocus]);

  const clickUpIcon = useCallback(() => {
    setIsOpen(false);
    setIsFocus(false);
  }, [setIsFocus]);

  const clickItem = useCallback((name: string) => {
    setTokenName(name);
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
                <li key={el.id} onClick={() => clickItem(el.name)}>
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

export default SwapInput;
