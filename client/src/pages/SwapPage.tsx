import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';

import {
  SwapPageWrapper,
  DetailInfoStyle,
  IconWrapper,
  ButtonWrapper,
} from './styles/SwapPage.styles';

import SwapInput from '../components/Input/SwapInput';

import {
  callContract,
  sendContract,
  callIsApproved,
  sendApprove,
} from '../utils/KAS';

import { exchangeAddressTable } from '../constants/index';
import useInput from '../hooks/useInput';

const arrowDown = faArrowDown as IconProp;
const callCaver = new Caver('https://api.baobab.klaytn.net:8651');
const caver = new Caver(window.klaytn);

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
    // parameters: [caver.utils.convertToPeb(balance, 'KLAY')],
    parameters: [balance],
  });
  return result;
};

const SwapPage = () => {
  const params = useParams();
  const setToken: any = params ? params : 'kSSE';
  const [nameA, setNameA] = useState<string>(setToken);
  const [nameB, setNameB] = useState<string>(setToken);
  const [detailInfo, setDetailInfo] = useState<number>(0);
  const [isApproveA, setIsApproveA] = useState(false);
  const [isApproveB, setIsApproveB] = useState(false);

  const {
    tokenBalance: tokenBalanceA,
    isFocus: isFocusA,
    isBlankError: isBlankErrorA,
    isDecimalError: isDecimalErrorA,
    isChange: isChangeA,
    setIsChange: setBalanceA,
    setTokenBalance: setTokenBalanceA,
    setKey: setKeyA,
    setIsFocus: setIsFocusA,
    changeInput: changeInputA,
  } = useInput(6);

  const swapInputPropsA = {
    tokenName: nameA,
    setTokenName: setNameA,
    tokenBalance: tokenBalanceA,
    isFocus: isFocusA,
    isBlankError: isBlankErrorA,
    isDecimalError: isDecimalErrorA,
    isChange: isChangeA,
    setIsChange: setBalanceA,
    setTokenBalance: setTokenBalanceA,
    setKey: setKeyA,
    setIsFocus: setIsFocusA,
    changeInput: changeInputA,
  };

  const {
    tokenBalance: tokenBalanceB,
    isFocus: isFocusB,
    isBlankError: isBlankErrorB,
    isDecimalError: isDecimalErrorB,
    isChange: isChangeB,
    setIsChange: setBalanceB,
    setTokenBalance: setTokenBalanceB,
    setKey: setKeyB,
    setIsFocus: setIsFocusB,
    changeInput: changeInputB,
  } = useInput(6);

  const swapInputPropsB = {
    tokenName: nameB,
    setTokenName: setNameB,
    tokenBalance: tokenBalanceB,
    isFocus: isFocusB,
    isBlankError: isBlankErrorB,
    isDecimalError: isDecimalErrorB,
    isChange: isChangeB,
    setIsChange: setBalanceB,
    setTokenBalance: setTokenBalanceB,
    setKey: setKeyB,
    setIsFocus: setIsFocusB,
    changeInput: changeInputB,
  };

  const handler = async () => {
    if (+tokenBalanceA > 0) {
      const amountKlay = await callContract({
        contractName: 'Exchange',
        contractAddress: `${exchangeAddressTable[nameA]}`,
        methodName: 'getEthAmount',
        parameters: [
          callCaver.utils.toBN(Number(tokenBalanceA) * 1000000000000000000),
        ],
      });
      console.log('amountKlay', amountKlay);

      const isApproved = await callIsApproved({ stockName: nameA });
      if (isApproved) {
        //   console.log('isApproved', isApproved);
        const fee = amountKlay * 0.99;
        await sendContract({
          contractName: 'Exchange',
          contractAddress: `${exchangeAddressTable[nameA]}`,
          methodName: 'tokenToEthSwap',
          parameters: [tokenBalanceA, fee],
        });
      } else {
        console.log('1341234');
        await sendApprove({ stockName: nameA });
        setIsApproveA(true);
      }
    }

    const fee = +amountKlay * 0.99;
    const swapTokenToKlay = await callContract({
      contractName: 'Exchange',
      contractAddress: `${exchangeAddressTable[nameA]}`,
      methodName: 'tokenToEthSwap',
      parameters: [tokenBalanceA, fee],
    });
    if (+tokenBalanceB > 0) {
      await callIsApproved({ stockName: nameB });
      await sendApprove({ stockName: nameB });

      const onKlayToToken = await callContract({
        contractName: 'Exchange',
        contractAddress: `${exchangeAddressTable[nameB]}`,
        methodName: 'getTokenAmount',
        parameters: [tokenBalanceB],
      });
      console.log('2onKlayToToken', onKlayToToken);
    }
  };

  return (
    <SwapPageWrapper>
      <h2>Swap</h2>
      <form action="">
        <SwapInput {...swapInputPropsA}>INPUT</SwapInput>
        <IconWrapper>
          <FontAwesomeIcon icon={arrowDown} className="icon" />
        </IconWrapper>
        {/* <SwapInput
          liftState={liftStateB}
          otherBalance={balanceB}
          otherName={nameA}
          otherChange={isChangeA}
          myChange={setIsChangeB}
        > */}
        OUTPUT
        {/* </SwapInput> */}
        {tokenBalanceA && tokenBalanceB && (
          <DetailInfoStyle>
            <div>
              <dt>현재 가격</dt>
              <dd>{detailInfo.toLocaleString('ko-KR')} KRW</dd>
            </div>
            <div>
              <dt>수수료</dt>
              <dd>5 KLAY</dd>
            </div>
          </DetailInfoStyle>
        )}
        <ButtonWrapper
          numberA={Number(tokenBalanceA)}
          numberB={Number(tokenBalanceB)}
          isErrorA={isDecimalErrorA}
          isErrorB={isDecimalErrorB}
          type="button"
          // onClick={clickButton}
        >
          스왑하기
        </ButtonWrapper>
      </form>
    </SwapPageWrapper>
  );
};

export default SwapPage;
