import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';

import 'react-toastify/dist/ReactToastify.css';
import {
  SwapPageWrapper,
  DetailInfoStyle,
  IconWrapper,
  ButtonWrapper,
} from './styles/SwapPage.styles';

import ToastPortal from '../components/portal/ToastPortal';
import SwapInput from '../components/Input/SwapInput';
import useInput from '../hooks/useInput';

import {
  callContract,
  sendContract,
  callIsApproved,
  sendApprove,
} from '../utils/KAS';
import {
  exchangeAddressTable,
  kStockTokenAddressTable,
} from '../constants/index';

const arrowDown = faArrowDown as IconProp;
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
  const setToken = params.token !== undefined ? params.token : 'kSSE';
  const [nameA, setNameA] = useState<string>(setToken);
  const [nameB, setNameB] = useState<string>(setToken);
  // const [detailInfo, setDetailInfo] = useState<number>(0);
  const [isApproveA, setIsApproveA] = useState(false);
  const [fee, setFee] = useState<string>('');
  const successNotify = () => toast.success('SUCCESS!!!');
  const failNotify = () => toast.error('FAIL!!!');

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

  /**
   * swap type 에 따른 함수
   */

  const swapSelector = async ({
    tokenName,
    tokenBalance, // klayBalance
  }: {
    tokenName: string;
    tokenBalance: string;
  }) => {
    // klay <> token
    const klayToTokenInputA = async ({
      tokenName,
      tokenBalance, // klayBalance
    }: {
      tokenName: string;
      tokenBalance: string;
    }) => {
      if (Number(tokenBalance) <= 0) {
        setTokenBalanceB('0');
        return;
      }
      const swapTokenAmount: string = await amountToken(
        nameB,
        caver.utils.convertToPeb(tokenBalance, 'KLAY')
      );
      setTokenBalanceB(Number(Number(swapTokenAmount) / 10 ** 18).toFixed(6));
      // const approved = await callIsApproved({ stockName: tokenName });
      setIsApproveA(true);
      setFee(Number(+tokenBalance * 0.003).toFixed(3) + ' ' + nameA);
    };

    // token <> klay
    const tokenToKlayInputA = async ({
      tokenName,
      tokenBalance,
    }: {
      tokenName: string;
      tokenBalance: string;
    }) => {
      if (Number(tokenBalance) <= 0) {
        setTokenBalanceB('0');
        return;
      }
      const swapKlayAmount: string = await amountKlay(tokenName, tokenBalance);
      setTokenBalanceB(Number(Number(swapKlayAmount) / 10 ** 18).toFixed(6));
      const approved = await callIsApproved({ stockName: tokenName });
      setIsApproveA(approved);
      setIsApproveA(true);
      setFee(Number(+tokenBalance * 0.003).toFixed(3) + ' ' + nameA);
    };

    const onCalculateInputA = async ({
      tokenName,
      tokenBalance,
    }: {
      tokenName: string;
      tokenBalance: string;
    }) => {
      if (tokenBalance === '') {
        tokenBalance = '0';
      }
      if (+tokenBalance > 0) {
        const changeTokenA = await amountKlay(tokenName, tokenBalance);
        const changeKlay: string = await amountToken(nameB, changeTokenA);
        setTokenBalanceB((+changeKlay / 10 ** 18).toString());
        const approvedA = await callIsApproved({ stockName: tokenName });
        const approvedB = await callIsApproved({ stockName: nameB });

        console.log('approvedA :', approvedA);
        console.log('approvedB :', approvedB);
        setIsApproveA(approvedA);
        setIsApproveA(true);
        setFee(Number(+tokenBalance * 0.006).toFixed(3) + ' ' + nameA);
      }
    };

    // main
    if (nameA === 'KLAY') {
      if (nameB === 'KLAY') {
        return doNothing({ tokenName, tokenBalance });
      } else {
        return klayToTokenInputA({ tokenName, tokenBalance });
      }
    } else {
      if (nameB === 'KLAY') {
        return tokenToKlayInputA({ tokenName, tokenBalance });
      } else {
        return onCalculateInputA({ tokenName, tokenBalance });
      }
    }
  };
  const doNothing = async ({
    tokenName,
    tokenBalance,
  }: {
    tokenName: string;
    tokenBalance: string;
  }) => {
    return;
  };

  // const onCalculateInputB = async ({
  //   tokenName,
  //   tokenBalance,
  // }: {
  //   tokenName: string;
  //   tokenBalance: string;
  // }) => {
  //   if (+tokenBalance > 0) {
  //     const changeTokenB: string = await amountKlay(tokenName, tokenBalance);
  //     const changeKlay: string = await amountToken(nameA, changeTokenB);

  //     setTokenBalanceA((+changeKlay / 10 ** 18).toString());

  //     const approvedA = await callIsApproved({ stockName: tokenName });
  //     const approvedB = await callIsApproved({ stockName: nameB });

  //     setIsApproveA(approvedA);
  //   }
  // };

  const onApprove = async () => {
    if (!isApproveA) {
      const result = await sendApprove({ stockName: nameA });
      if (result instanceof Error === false) {
        setIsApproveA(true);
        successNotify();
      } else {
        failNotify();
      }
    }
  };

  const onSwap = async () => {
    if (nameA === 'KLAY') {
      if (nameB === 'KLAY') {
        return; // nothing
      } else {
        // klayToToken
        const result = await sendContract({
          contractName: 'Exchange',
          contractAddress: exchangeAddressTable[nameB],
          methodName: 'ethToTokenSwap',
          parameters: [
            caver.utils.convertToPeb(
              (+tokenBalanceB * 0.99).toFixed(15),
              'KLAY'
            ),
          ],
          amount: tokenBalanceA,
        });

        if (result instanceof Error === false) {
          successNotify();
        } else {
          failNotify();
        }
      }
    } else {
      if (nameB === 'KLAY') {
        // tokenToKlay
        const result = await sendContract({
          contractName: 'Exchange',
          contractAddress: exchangeAddressTable[nameA],
          methodName: 'tokenToEthSwap',
          parameters: [
            caver.utils.convertToPeb(tokenBalanceA, 'KLAY'),
            caver.utils.convertToPeb(
              (+tokenBalanceB * 0.99).toFixed(15),
              'KLAY'
            ),
          ],
        });

        if (result instanceof Error === false) {
          successNotify();
        } else {
          failNotify();
        }
      } else {
        // tokenTotoken
        const result = await sendContract({
          contractName: 'Exchange',
          contractAddress: exchangeAddressTable[nameA],
          methodName: 'tokenToTokenSwap',
          parameters: [
            caver.utils.convertToPeb(tokenBalanceA, 'KLAY'),
            caver.utils.convertToPeb(
              (+tokenBalanceB * 0.99).toFixed(15),
              'KLAY'
            ),
            kStockTokenAddressTable[nameB],
          ],
        });

        if (result instanceof Error === false) {
          successNotify();
        } else {
          failNotify();
        }
      }
    }
  };

  return (
    <SwapPageWrapper>
      <h2 className="tit">Swap</h2>
      <form action="">
        <SwapInput {...swapInputPropsA} onCalculateInput={swapSelector}>
          INPUT
        </SwapInput>
        <IconWrapper>
          <FontAwesomeIcon icon={arrowDown} className="icon" />
        </IconWrapper>
        <SwapInput {...swapInputPropsB} onCalculateInput={doNothing}>
          OUTPUT
        </SwapInput>
        {tokenBalanceA && tokenBalanceB && (
          <DetailInfoStyle>
            {/* <div>
              <dt>현재 가격</dt>
              <dd>{detailInfo.toLocaleString('ko-KR')} KRW</dd>
            </div> */}
            <div>
              <dt>수수료</dt>
              <dd>{fee}</dd>
            </div>
          </DetailInfoStyle>
        )}
        {isApproveA ? (
          <ButtonWrapper
            numberA={Number(tokenBalanceA)}
            numberB={Number(tokenBalanceB)}
            isErrorA={isDecimalErrorA}
            isErrorB={isDecimalErrorB}
            type="button"
            onClick={onSwap}
          >
            SWAP
          </ButtonWrapper>
        ) : (
          <ButtonWrapper
            numberA={Number(tokenBalanceA)}
            numberB={Number(tokenBalanceB)}
            isErrorA={isDecimalErrorA}
            isErrorB={isDecimalErrorB}
            type="button"
            onClick={onApprove}
          >
            APPROVE
          </ButtonWrapper>
        )}
      </form>
      <ToastPortal />
    </SwapPageWrapper>
  );
};

export default SwapPage;
