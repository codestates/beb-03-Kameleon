import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';

import {
  MultipleInputContainer,
  MultipleInputWrapper,
  MultipleInputBlank,
  MultipleInputList,
} from './styles/MultipleInput.styles';

import { IUseInput } from '../../hooks/useInput';

import { callContract, getBalance } from '../../utils/KAS';
import { kStockTokenAddressTable } from '../../constants';

interface TokenListProps {
  id: number;
  name: string;
}

interface ISwapInput extends IUseInput {
  children?: React.ReactNode;
  tokenName: string;
  setTokenName: React.Dispatch<React.SetStateAction<string>>;
  // onCalculateInput: ({value: string}) => void;
  onCalculateInput: any;
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
  onCalculateInput,
}: ISwapInput) => {
  const params = useParams();
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 선택한 token의 이름, 가격, 수량
  const [tokenList, setTokenList] = useState<Array<TokenListProps>>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  // selected list 설정
  useEffect(() => {
    const tList = new Array<TokenListProps>();
    const symbolTable = Object.keys(kStockTokenAddressTable);
    let i = 0;
    for (i; i < symbolTable.length; i++) {
      const token: TokenListProps = {
        id: i,
        name: symbolTable[i],
      };
      tList.push(token);
    }
    tList.push({
      id: i,
      name: 'KLAY',
    });
    setTokenList(tList);
    setTokenName(params.token ? params.token : tList[i].name);
  }, [params.token, setTokenName]);

  // tokenName 변경에 따라 Max값 변경
  useEffect(() => {
    // name을 확인 후 초기값 설정
    // maxBalance, numberofDecimal
    if (tokenName === 'KLAY') {
      getBalance({ address: window.klaytn.selectedAddress }).then((res) => {
        setMaxValue(Number((+res / 10 ** 18).toFixed(2)));
      });
    } else {
      callContract({
        contractName: 'KStockToken',
        contractAddress: kStockTokenAddressTable[tokenName],
        methodName: 'balanceOf',
        parameters: [window.klaytn.selectedAddress],
      }).then((res) => setMaxValue(Number((+res / 10 ** 18).toFixed(6))));
    }
  }, [tokenName, user]);

  const clickDownIcon = useCallback(() => {
    setIsOpen(true);
    setIsFocus(true);
  }, [setIsFocus]);

  const clickUpIcon = useCallback(() => {
    setIsOpen(false);
    setIsFocus(false);
  }, [setIsFocus]);

  const clickItem = useCallback(
    (name: string) => {
      setTokenName(name);
      onCalculateInput({ name, tokenBalance });
    },
    [onCalculateInput, tokenBalance, setTokenName]
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('event value : ', e.keyCode);
    const tokenBalance = e.target.value;
    changeInput(e);
    onCalculateInput({ tokenName, tokenBalance });
  };

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
            onChange={onChangeHandler}
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
