import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import {
  LiquidityPageWrapper,
  TabStyle,
  InputStyle,
  DetailInfoStyle,
  IconWrapper,
  OutputWrapper,
} from './styles/LiquidityPage.styles';

import LiquidityInput from '../components/Input/LiquidityInput';
import LiquidityRemoveInput from '../components/Input/LiquidityRemoveInput';

import {
  sendContract,
  callContract,
  callIsApproved,
  sendApprove,
  getBalance,
} from '../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../constants';

const plus = faPlus as IconProp;
const arrowDown = faArrowDown as IconProp;
const caver = new Caver();

const LiquidityPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('deposit');
  const [balanceA, setBalanceA] = useState<string>('');
  const [balanceB, setBalanceB] = useState<string>('');
  const [balanceC, setBalanceC] = useState<number>(0);
  const [isChangeA, setIsChangeA] = useState<boolean>(false);
  const [isChangeB, setIsChangeB] = useState<boolean>(false);
  const [isChangeC, setIsChangeC] = useState<boolean>(false);
  const [isDecimalErrorA, setIsDecimalErrorA] = useState<boolean>(false);
  const [isDecimalErrorB, setIsDecimalErrorB] = useState<boolean>(false);
  const [isDecimalErrorC, setIsDecimalErrorC] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [ratio, setRatio] = useState<number>(0);
  const [output, setOutput] = useState<number>(0);
  const [output2, setOutput2] = useState<number>(0);

  useEffect(() => {
    if (id !== undefined) {
      setName(id);
    }
  }, [id]);

  const liftStateA = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setBalanceA(balance);
      setIsChangeA(isChange);
      setIsDecimalErrorA(isDecimalError);
    },
    []
  );

  const liftStateB = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setBalanceB(balance);
      setIsChangeB(isChange);
      setIsDecimalErrorB(isDecimalError);
    },
    []
  );

  const liftStateC = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setBalanceC(Number(balance));
      setIsChangeC(isChange);
      setIsDecimalErrorC(isDecimalError);
    },
    []
  );

  const addButton = useCallback(async () => {
    console.log(balanceA, balanceB);
    console.log(window.klaytn.selectedAddress);

    const isApprove = await callIsApproved({ stockName: name });

    if (!isApprove) {
      await sendApprove({ stockName: name });
    } else {
      await sendContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'addLiquidity',
        amount: balanceA, // klay
        parameters: [caver.utils.toBN(Number(balanceB) * 1000000000000000000)],
      });
    }
  }, [name, balanceA, balanceB]);

  const removeButton = useCallback(() => {
    sendContract({
      contractName: 'Exchange',
      contractAddress: exchangeAddressTable[name],
      methodName: 'removeLiquidity',
      parameters: [caver.utils.convertToPeb(balanceC.toString(), 'KLAY')],
    });
    console.log('remove', balanceC);
  }, [balanceC]);

  useEffect(() => {
    // KLAY 대 kSTOCKTOKEN 비율 확인
    const callAmount = async () => {
      const result = await callContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'getMinimumTokenAmountToAddLiquidity',
        parameters: [caver.utils.toBN(1000000000)],
      });
      setRatio(result / 1000000000);
    };

    if (name !== '') {
      callAmount();
    }
  }, [name, balanceA]);

  useEffect(() => {
    const calculateOutput = async (kStockName: string, lpAmount: number) => {
      const promiseTemp: Array<Promise<any>> = [];

      // 1.pool내 klay
      let poolKlay: string;
      promiseTemp.push(
        getBalance({
          address: exchangeAddressTable[kStockName],
        }).then((res) => {
          poolKlay = res;
        })
      );

      // 2.pool내 kStock토큰 수
      let poolKStock: string;
      promiseTemp.push(
        callContract({
          contractName: 'KStockToken',
          contractAddress: kStockTokenAddressTable[kStockName],
          methodName: 'balanceOf',
          parameters: [exchangeAddressTable[kStockName]],
        }).then((res) => {
          poolKStock = res;
        })
      );

      // 3.totalLP
      let totalLP: string;
      promiseTemp.push(
        callContract({
          contractName: 'Exchange',
          contractAddress: exchangeAddressTable[kStockName],
          methodName: 'totalSupply',
        }).then((res) => {
          totalLP = res;
        })
      );

      // 모두 가져온 후 push
      Promise.all(promiseTemp).then(() => {
        const ratio =
          (Number(lpAmount) * 1000000000000000000) / Number(totalLP);
        setOutput(
          Number(((Number(poolKlay) * ratio) / 1000000000000000000).toFixed(6))
        );
        setOutput2(
          Number(
            ((Number(poolKStock) * ratio) / 1000000000000000000).toFixed(6)
          )
        );
      });
    };

    if (balanceC > 0) {
      calculateOutput(name, balanceC);
    }
  }, [balanceC]);

  return (
    <LiquidityPageWrapper>
      <h2>Liquidity</h2>
      <TabStyle>
        <button
          type="button"
          onClick={() => setTab('deposit')}
          className={tab === 'deposit' ? 'on' : ''}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setTab('withdrawal')}
          className={tab === 'withdrawal' ? 'on' : ''}
        >
          Remove
        </button>
      </TabStyle>
      <form action="">
        {tab === 'deposit' ? (
          <>
            <div>
              <LiquidityInput
                liftState={liftStateA}
                otherBalance={Number(balanceB)}
                otherChange={isChangeB}
                isKlay={true}
                ratio={ratio}
              >
                INPUT
              </LiquidityInput>
              <IconWrapper>
                <FontAwesomeIcon icon={plus} className="icon" />
              </IconWrapper>
              <LiquidityInput
                liftState={liftStateB}
                otherBalance={Number(balanceA)}
                otherChange={isChangeA}
                isKlay={false}
                ratio={ratio}
              >
                INPUT
              </LiquidityInput>
              <DetailInfoStyle>
                <div>
                  <dt>유동성 규모</dt>
                  <dd>000000</dd>
                </div>
              </DetailInfoStyle>
            </div>
            <button type="button" onClick={addButton}>
              Add
            </button>
          </>
        ) : (
          <>
            <div>
              <LiquidityRemoveInput liftState={liftStateC}>
                INPUT
              </LiquidityRemoveInput>
              <IconWrapper>
                <FontAwesomeIcon icon={arrowDown} className="icon" />
              </IconWrapper>
              <OutputWrapper>
                <label>OUTPUT</label>
                <div>
                  {output} KLAY + {output2} {name}
                </div>
              </OutputWrapper>
            </div>
            <button type="button" onClick={removeButton}>
              Remove
            </button>
          </>
        )}
      </form>
    </LiquidityPageWrapper>
  );
};

export default LiquidityPage;
