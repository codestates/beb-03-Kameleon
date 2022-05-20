import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Caver from 'caver-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  LiquidityPageWrapper,
  TabStyle,
  InputStyle,
  DetailInfoStyle,
  IconWrapper,
} from './styles/LiquidityPage.styles';

import LiquidityInput from '../components/Input/LiquidityInput';

import {
  sendContract,
  callContract,
  callIsApproved,
  sendApprove,
} from '../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../constants';

const plus = faPlus as IconProp;
const caver = new Caver(window.klaytn);

const LiquidityPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState('deposit');
  const [balanceA, setBalanceA] = useState<string>('');
  const [balanceB, setBalanceB] = useState<string>('');
  const [isChangeA, setIsChangeA] = useState<boolean>(false);
  const [isChangeB, setIsChangeB] = useState<boolean>(false);
  const [isDecimalErrorA, setIsDecimalErrorA] = useState<boolean>(false);
  const [isDecimalErrorB, setIsDecimalErrorB] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [ratio, setRatio] = useState<number>(0);

  useEffect(() => {
    if (id !== undefined) {
      setName(id);
    }
  }, [id]);

  // useEffect(() => {
  //   console.log('1');
  // }, []);

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

  const addButton = useCallback(async () => {
    console.log(balanceA, balanceB);
    console.log(window.klaytn.selectedAddress);

    const isApprove = await callIsApproved({ stockName: name });
    console.log('첫번째', isApprove);

    if (!isApprove) {
      await sendApprove({ stockName: name });
      console.log('두번째');
    }

    await sendContract({
      contractName: 'Exchange',
      contractAddress: '0x5456540aabd10eb07b92af271072027f1f72b3dc',
      methodName: 'addLiquidity',
      amount: balanceA, // klay
      parameters: [caver.utils.toBN(Number(balanceB) * 1000000000000000000)],
    });
    console.log('세번째');
  }, [name, balanceA, balanceB]);

  const removeButton = useCallback(() => {
    console.log('remove');
  }, []);

  useEffect(() => {
    // KLAY 대 kSTOCKTOKEN 비율 확인
    const callAmount = async () => {
      const result = await callContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'getMinimumTokenAmountToAddLiquidity',
        parameters: [caver.utils.toBN(Number(balanceA) * 1000000000000000000)],
      });

      setRatio(result / 1000000000000000000 / Number(balanceA));
    };

    if (name !== '') {
      callAmount();
    }
  }, [name, balanceA]);

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
              {/* <LiquidityInput
                liftState={liftStateA}
                otherBalance={Number(balanceB)}
                otherPrice={priceB}
                otherChange={isChangeB}
                isKlay={false}
                tab={tab}
              >
                INPUT
              </LiquidityInput> */}
              <InputStyle>
                <div className="single-inp">
                  <label htmlFor="input">kSAMSUNG Token</label>
                  <span>
                    <input type="number" id="input" placeholder="00000" />
                  </span>
                </div>
                <button type="button">Token</button>
                <dl>
                  <dt>Output</dt>
                  <dd>0.0000 ETH + 0.0000 KMT</dd>
                </dl>
              </InputStyle>
              <DetailInfoStyle>
                <div>
                  <dt>Exchange Rate</dt>
                  <dd>1 KLAY = 1000 KMT</dd>
                </div>
                <div>
                  <dt>Current Pool Size</dt>
                  <dd>1 ETH + 1000 KMT</dd>
                </div>
                <div>
                  <dt>Your Pool Share (0.000%)</dt>
                  <dd>1 ETH + 1000 KMT</dd>
                </div>
              </DetailInfoStyle>
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
