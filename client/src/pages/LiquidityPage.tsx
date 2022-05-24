import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Caver from 'caver-js';

import {
  LiquidityPageWrapper,
  TabStyle,
  IconWrapper,
  OutputWrapper,
} from './styles/LiquidityPage.styles';

import LiquidityInput from '../components/Input/LiquidityInput';
import LiquidityRemoveInput from '../components/Input/LiquidityRemoveInput';

import useButton from '../hooks/useButton';
import { callContract, callIsApproved, getBalance } from '../utils/KAS';
import { exchangeAddressTable, kStockTokenAddressTable } from '../constants';

const plus = faPlus as IconProp;
const arrowDown = faArrowDown as IconProp;
const caver = new Caver();

interface RootState {
  user: {
    isLogin: boolean;
  };
}

interface TokenType {
  balance: string;
  isChange: boolean;
  isDecimalError: boolean;
}

interface RatioType {
  klayRatio: number;
  kStockRatio: number;
}

const LiquidityPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState<string>('deposit');
  const [name, setName] = useState<string>('');
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [addRatio, setAddRatio] = useState<number>(0);
  const [removeRatio, setRemoveRatio] = useState<RatioType>({
    klayRatio: 0,
    kStockRatio: 0,
  });
  // const [output, setOutput] = useState<number>(0);
  // const [output2, setOutput2] = useState<number>(0);
  const [klayToken, setKlayToken] = useState<TokenType>({
    balance: '',
    isChange: false,
    isDecimalError: false,
  });
  const [kStockToken, setKStockToken] = useState<TokenType>({
    balance: '',
    isChange: false,
    isDecimalError: false,
  });
  const [lpToken, setLPToken] = useState<TokenType>({
    balance: '',
    isChange: false,
    isDecimalError: false,
  });

  const { addButton, removeButton, connectButton, approveButton } = useButton();

  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const liftKlayToken = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setKlayToken({
        balance,
        isChange,
        isDecimalError,
      });
    },
    []
  );

  const liftKStockToken = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setKStockToken({
        balance,
        isChange,
        isDecimalError,
      });
    },
    []
  );

  const liftLPToken = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setLPToken({
        balance,
        isChange,
        isDecimalError,
      });
    },
    []
  );

  useEffect(() => {
    // paramsID 확인
    if (id !== undefined) {
      setName(id);
    }
  }, [id]);

  useEffect(() => {
    // Approve 유무 확인
    const checkApprove = async () => {
      const isApprove = await callIsApproved({ stockName: name });

      if (!isApprove) {
        setIsApprove(true);
      } else {
        setIsApprove(false);
      }
    };

    if (window.klaytn.selectedAddress) {
      checkApprove();
    }
  }, [name, user, window.klaytn.selectedAddres]);

  useEffect(() => {
    // KLAY 대 kSTOCKTOKEN 비율 확인
    const callAmount = async () => {
      const result = await callContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'getMinimumTokenAmountToAddLiquidity',
        parameters: [caver.utils.toBN(1000000000)],
      });
      setAddRatio(result / 1000000000);
    };

    if (name !== '') {
      callAmount();
    }
  }, [name, klayToken]);

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
        setRemoveRatio({
          klayRatio: Number(
            ((Number(poolKlay) * ratio) / 1000000000000000000).toFixed(6)
          ),
          kStockRatio: Number(
            ((Number(poolKStock) * ratio) / 1000000000000000000).toFixed(6)
          ),
        });
      });
    };

    if (Number(lpToken.balance) > 0) {
      calculateOutput(name, Number(lpToken.balance));
    }
  }, [lpToken.balance]);

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
                liftState={liftKlayToken}
                otherBalance={Number(kStockToken.balance)}
                otherChange={kStockToken.isChange}
                isKlay={true}
                ratio={addRatio}
              >
                INPUT
              </LiquidityInput>
              <IconWrapper>
                <FontAwesomeIcon icon={plus} className="icon" />
              </IconWrapper>
              <LiquidityInput
                liftState={liftKStockToken}
                otherBalance={Number(klayToken.balance)}
                otherChange={klayToken.isChange}
                isKlay={false}
                ratio={addRatio}
              >
                INPUT
              </LiquidityInput>
            </div>
            {!user.isLogin ? (
              <button type="button" onClick={connectButton}>
                Connect
              </button>
            ) : isApprove ? (
              <button
                type="button"
                onClick={async () => {
                  const result = await approveButton(name);
                  if (result instanceof Error === false) {
                    setIsApprove(false);
                  }
                }}
              >
                Approve
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  addButton(name, klayToken.balance, kStockToken.balance)
                }
              >
                Add
              </button>
            )}
          </>
        ) : (
          <>
            <div>
              <LiquidityRemoveInput liftState={liftLPToken}>
                INPUT
              </LiquidityRemoveInput>
              <IconWrapper>
                <FontAwesomeIcon icon={arrowDown} className="icon" />
              </IconWrapper>
              <OutputWrapper>
                <label>OUTPUT</label>
                <div>
                  {removeRatio.klayRatio} KLAY + {removeRatio.kStockRatio}{' '}
                  {name}
                </div>
              </OutputWrapper>
            </div>
            {!user.isLogin ? (
              <button type="button" onClick={connectButton}>
                Connect
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeButton(name, lpToken.balance)}
              >
                Remove
              </button>
            )}
          </>
        )}
      </form>
    </LiquidityPageWrapper>
  );
};

export default LiquidityPage;
