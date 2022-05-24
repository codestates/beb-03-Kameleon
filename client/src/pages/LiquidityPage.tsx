import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { login, logout } from '../store/user';
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
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [tokenA, setTokenA] = useState<TokenType>({
    balance: '',
    isChange: false,
    isDecimalError: false,
  });
  const [tokenB, setTokenB] = useState<TokenType>({
    balance: '',
    isChange: false,
    isDecimalError: false,
  });

  const { addButton, removeButton, connectButton, approveButton } = useButton();

  const dispatch = useDispatch();
  const selectUser = (state: RootState) => state.user;
  const user = useSelector(selectUser);

  const liftStateA = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setBalanceA(balance);
      setIsChangeA(isChange);
      setIsDecimalErrorA(isDecimalError);
      setTokenA({
        balance,
        isChange,
        isDecimalError,
      });
    },
    []
  );

  const liftStateB = useCallback(
    (balance: string, isChange: boolean, isDecimalError: boolean) => {
      setBalanceB(balance);
      setIsChangeB(isChange);
      setIsDecimalErrorB(isDecimalError);
      setTokenB({
        balance,
        isChange,
        isDecimalError,
      });
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

  useEffect(() => {
    const checkApprove = async () => {
      const isApprove = await callIsApproved({ stockName: name });

      if (!isApprove) {
        setIsApprove(true);
      } else {
        setIsApprove(false);
      }
    };

    checkApprove();
  }, [name, user]);

  useEffect(() => {
    // paramsID 확인
    if (id !== undefined) {
      setName(id);
    }
  }, [id]);

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

  console.log(tokenA);
  console.log(tokenB);

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
                otherBalance={Number(tokenB.balance)}
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
                otherBalance={Number(tokenA.balance)}
                otherChange={isChangeA}
                isKlay={false}
                ratio={ratio}
              >
                INPUT
              </LiquidityInput>
            </div>
            {!user.isLogin ? (
              <button type="button" onClick={connectButton}>
                Connect
              </button>
            ) : isApprove ? (
              <button type="button" onClick={() => approveButton(name)}>
                Approve
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addButton(name, balanceA, balanceB)}
              >
                Add
              </button>
            )}
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
            {!user.isLogin ? (
              <button type="button" onClick={connectButton}>
                Connect
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeButton(name, balanceC)}
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
