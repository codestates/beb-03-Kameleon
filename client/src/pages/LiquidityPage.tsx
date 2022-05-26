import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Caver from 'caver-js';

import 'react-toastify/dist/ReactToastify.css';
import {
  LiquidityPageWrapper,
  TabStyle,
  IconWrapper,
  OutputWrapper,
  ButtonWrapper,
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
  klayBalance: number;
  kStockBalance: number;
}

const LiquidityPage = () => {
  const { id } = useParams();
  const [tab, setTab] = useState<string>('deposit');
  const [name, setName] = useState<string>('');
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [addRatio, setAddRatio] = useState<number>(0);
  const [removeRatio, setRemoveRatio] = useState<RatioType>({
    klayBalance: 0,
    kStockBalance: 0,
  });
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
  const successNotify = () => toast.success('Success!');
  const failNotify = () => toast.error('fail!');

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
      const result = await callIsApproved({ stockName: name });

      if (result) {
        setIsApprove(true);
      } else {
        setIsApprove(false);
      }
    };

    if (window.klaytn.selectedAddress) {
      checkApprove();
    }
  }, [name, user]);

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
      // 1.pool내 klay
      const poolKlay = await getBalance({
        address: exchangeAddressTable[kStockName],
      });

      // 2.pool내 kStock토큰 수
      const poolKStock = await callContract({
        contractName: 'KStockToken',
        contractAddress: kStockTokenAddressTable[kStockName],
        methodName: 'balanceOf',
        parameters: [exchangeAddressTable[kStockName]],
      });

      // 3.totalLP
      const totalLP = await callContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[kStockName],
        methodName: 'totalSupply',
      });

      // 모두 가져온 후 push
      const ratio = (Number(lpAmount) * 1000000000000000000) / Number(totalLP);
      setRemoveRatio({
        klayBalance: Number(
          ((Number(poolKlay) * ratio) / 1000000000000000000).toFixed(2)
        ),
        kStockBalance: Number(
          ((Number(poolKStock) * ratio) / 1000000000000000000).toFixed(6)
        ),
      });
    };

    if (Number(lpToken.balance) > 0) {
      calculateOutput(name, Number(lpToken.balance));
    }
  }, [name, lpToken.balance]);

  return (
    <LiquidityPageWrapper>
      <h2 className="tit">Liquidity</h2>
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
                numberOfDecimal={2}
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
                numberOfDecimal={6}
              >
                INPUT
              </LiquidityInput>
            </div>
            {!user.isLogin ? (
              <ButtonWrapper type="button" onClick={connectButton}>
                Connect
              </ButtonWrapper>
            ) : isApprove ? (
              <ButtonWrapper
                className="liquidity__addbutton"
                type="button"
                balanceA={klayToken.balance}
                balanceB={kStockToken.balance}
                isErrorA={klayToken.isDecimalError}
                isErrorB={kStockToken.isDecimalError}
                onClick={async () => {
                  const result = await addButton(
                    name,
                    klayToken.balance,
                    kStockToken.balance
                  );
                  if (result instanceof Error === false) {
                    successNotify();
                  } else {
                    failNotify();
                  }
                }}
              >
                Add
              </ButtonWrapper>
            ) : (
              <ButtonWrapper
                type="button"
                onClick={async () => {
                  const result = await approveButton(name);
                  if (result instanceof Error === false) {
                    setIsApprove(true);
                    successNotify();
                  } else {
                    failNotify();
                  }
                }}
              >
                Approve
              </ButtonWrapper>
            )}
          </>
        ) : (
          <>
            <div>
              <LiquidityRemoveInput liftState={liftLPToken} numberOfDecimal={6}>
                INPUT
              </LiquidityRemoveInput>
              <IconWrapper>
                <FontAwesomeIcon icon={arrowDown} className="icon" />
              </IconWrapper>
              <OutputWrapper>
                <label>OUTPUT</label>
                <div>
                  {removeRatio.klayBalance} KLAY + {removeRatio.kStockBalance}{' '}
                  {name}
                </div>
              </OutputWrapper>
            </div>
            {!user.isLogin ? (
              <ButtonWrapper onClick={connectButton} type="button">
                Connect
              </ButtonWrapper>
            ) : (
              <ButtonWrapper
                className="liquidity__removebutton"
                type="button"
                balanceA={lpToken.balance}
                isErrorA={lpToken.isDecimalError}
                onClick={async () => {
                  const result = await removeButton(name, lpToken.balance);
                  if (result instanceof Error === false) {
                    successNotify();
                  } else {
                    failNotify();
                  }
                }}
              >
                Remove
              </ButtonWrapper>
            )}
          </>
        )}
      </form>
      <ToastContainer icon={false} />
    </LiquidityPageWrapper>
  );
};

export default LiquidityPage;
