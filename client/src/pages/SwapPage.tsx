import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
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
import { isConditionalExpression } from 'typescript';

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
    parameters: [balance],
  });
  return result;
};

const SwapPage = () => {
  const params = useParams();
  const setToken: any = params.token !== undefined ? params.token : 'kSSE';
  const [nameA, setNameA] = useState<string>(setToken);
  const [nameB, setNameB] = useState<string>(setToken);
  const [detailInfo, setDetailInfo] = useState<number>(0);
  const [isApproveA, setIsApproveA] = useState(false);
  const [isApproveB, setIsApproveB] = useState(false);
  const [fee, setFee] = useState<string>('');

  const {
    tokenBalance: tokenBalanceA,
    isFocus: isFocusA,
    isBlankError: isBlankErrorA,
    isDecimalError: isDecimalErrorA,
    isChange: isChangeA,
    setIsChange: setIsChangeA,
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
    setIsChange: setIsChangeA,
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
    setIsChange: setIsChangeB,
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
    setIsChange: setIsChangeB,
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

  const onCalcurlateInputA = async ({
    tokenBalance,
  }: {
    tokenBalance: string;
  }) => {
    if (tokenBalance === '') {
      tokenBalance = '0';
    }
    const changeTokenA: string = await amountKlay(nameA, tokenBalance);
    console.log('1- tokenBalance : ', tokenBalance);
    // const changeTokenB: string = await amountKlay(nameB, balanceB);
    // console.log('changeTokenA', changeTokenA);
    // console.log('changeKlay', changeKlay);
    // const price = +currentKlayPrice * +changeTokenB;
    // const fee = +balanceA * 0.00`3;
    console.log(tokenBalance);
    if (+tokenBalance > 0) {
      const changeKlay: string = await amountToken(nameB, changeTokenA);
      console.log('1- changeTokenA : ', changeTokenA);
      console.log(tokenBalance);
      // setTokenBalanceA(tokenBalance);
      setTokenBalanceB((+changeKlay / 10 ** 18).toString());
    } else if (+tokenBalance === 0) {
      setTokenBalanceB('0');
    }
  };

  const onCalcurlateInputB = async ({
    tokenBalance,
  }: {
    tokenBalance: string;
  }) => {
    console.log('tokenBalance', tokenBalance);
    const changeTokenB: string = await amountKlay(nameB, tokenBalance);
    const changeKlay: string = await amountToken(nameA, changeTokenB);
    // const changeTokenB: string = await amountKlay(nameB, balanceB);
    // console.log('changeTokenA', changeTokenA);
    // console.log('changeKlay', changeKlay);
    // const price = +currentKlayPrice * +changeTokenB;
    // const fee = +balanceA * 0.003;
    if (+tokenBalance >= 0) {
      setTokenBalanceA(
        +tokenBalance === 0 ? '0' : (+changeKlay / 10 ** 18).toString()
      );
    }
  };

  return (
    <SwapPageWrapper>
      <h2>Swap</h2>
      <form action="">
        <SwapInput {...swapInputPropsA} onCalcurlateInput={onCalcurlateInputA}>
          INPUT
        </SwapInput>
        <IconWrapper>
          <FontAwesomeIcon icon={arrowDown} className="icon" />
        </IconWrapper>
        <SwapInput {...swapInputPropsB} onCalcurlateInput={onCalcurlateInputB}>
          OUTPUT
        </SwapInput>
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
