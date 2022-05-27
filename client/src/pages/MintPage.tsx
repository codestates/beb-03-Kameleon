import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Caver from 'caver-js';

import 'react-toastify/dist/ReactToastify.css';
import {
  MintPageWrapper,
  TabStyle,
  DetailInfoStyle,
  IconWrapper,
  ButtonWrapper,
} from './styles/MintPage.styles';

import ToastPortal from '../components/portal/ToastPortal';
import SingleInput from '../components/Input/SingleInput';
import MultipleInput from '../components/Input/MultipleInput';

import { sendContract } from '../utils/KAS';
import { kStockTokenAddressTable } from '../constants';

const caver = new Caver();

const arrowDown = faArrowDown as IconProp;

const MintPage = () => {
  const [tab, setTab] = useState<string>('mint');
  const [balanceA, setBalanceA] = useState<string>('');
  const [balanceB, setBalanceB] = useState<string>('');
  const [priceA, setPriceA] = useState<number>(0);
  const [priceB, setPriceB] = useState<number>(0);
  const [nameA, setNameA] = useState<string>('');
  const [nameB, setNameB] = useState<string>('');
  const [isChangeA, setIsChangeA] = useState<boolean>(false);
  const [isChangeB, setIsChangeB] = useState<boolean>(false);
  const [isDecimalErrorA, setIsDecimalErrorA] = useState<boolean>(false);
  const [isDecimalErrorB, setIsDecimalErrorB] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const successNotify = () => toast.success('SUCCESS!!!');
  const failNotify = () => toast.error('FAIL!!!');

  const liftStateA = useCallback(
    (
      balance: string,
      price: number,
      name: string,
      isChange: boolean,
      isDecimalError: boolean
    ) => {
      setBalanceA(balance);
      setPriceA(price);
      setNameA(name);
      setIsChangeA(isChange);
      setIsDecimalErrorA(isDecimalError);
    },
    []
  );

  const liftStateB = useCallback(
    (
      balance: string,
      price: number,
      name: string,
      isChange: boolean,
      isDecimalError: boolean
    ) => {
      setBalanceB(balance);
      setPriceB(price);
      setNameB(name);
      setIsChangeB(isChange);
      setIsDecimalErrorB(isDecimalError);
    },
    []
  );

  const clickButton = useCallback(async () => {
    // 임혁진 수정
    // 민트 클릭 시
    if (tab === 'mint') {
      const result = await sendContract({
        contractName: 'KStockToken',
        contractAddress: kStockTokenAddressTable[nameB],
        methodName: 'mint',
        amount: balanceA, // klay
      });
      if (result instanceof Error === false) {
        successNotify();
      } else {
        failNotify();
      }
    } else {
      // burn
      const result = await sendContract({
        contractName: 'KStockToken',
        contractAddress: kStockTokenAddressTable[nameA],
        methodName: 'burn',
        parameters: [caver.utils.convertToPeb(balanceA, 'KLAY')], // * 1e18
      });
      if (result instanceof Error === false) {
        successNotify();
      } else {
        failNotify();
      }
    }
  }, [tab, nameA, nameB, balanceA]);

  useEffect(() => {
    if (priceA > 0 && priceB > 0 && tab === 'mint') {
      const [, decimal] = String(priceA / priceB).split('.');
      if (decimal && decimal.length > 6) {
        setDetailInfo(Number((priceA / priceB).toFixed(6)));
      } else {
        setDetailInfo(priceA / priceB);
      }
    } else if (tab === 'burn') {
      const [, decimal] = String(priceB / priceA).split('.');
      if (decimal && decimal.length > 6) {
        setDetailInfo(Number((priceB / priceA).toFixed(6)));
      } else {
        setDetailInfo(priceB / priceA);
      }
    }
    setFee(+balanceA * 0.01);
  }, [tab, priceA, priceB, balanceA]);

  return (
    <MintPageWrapper>
      <h2 className="tit">Mint & Burn</h2>
      <TabStyle>
        <button
          type="button"
          onClick={() => setTab('mint')}
          className={tab === 'mint' ? 'on' : ''}
        >
          Mint
        </button>
        <button
          type="button"
          onClick={() => setTab('burn')}
          className={tab === 'burn' ? 'on' : ''}
        >
          Burn
        </button>
      </TabStyle>
      <form action="">
        {tab === 'mint' ? (
          <>
            <SingleInput
              liftState={liftStateA}
              otherBalance={Number(balanceB)}
              otherPrice={priceB}
              otherChange={isChangeB}
            >
              INPUT
            </SingleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <MultipleInput
              liftState={liftStateB}
              otherBalance={Number(balanceA)}
              otherPrice={priceA}
              otherChange={isChangeA}
            >
              OUTPUT
            </MultipleInput>
            {balanceA && balanceB && (
              <DetailInfoStyle>
                <div>
                  <dt>Exchange Rate</dt>
                  <dd>
                    1 KLAY = {detailInfo} {nameB}
                  </dd>
                </div>
                <div>
                  <dt>Fee(1%)</dt>
                  <dd>
                    {fee} {nameA}
                  </dd>
                </div>
              </DetailInfoStyle>
            )}
            <ButtonWrapper
              numberA={Number(balanceA)}
              numberB={Number(balanceB)}
              isErrorA={isDecimalErrorA}
              isErrorB={isDecimalErrorB}
              type="button"
              onClick={clickButton}
            >
              Mint
            </ButtonWrapper>
          </>
        ) : (
          <>
            <MultipleInput
              liftState={liftStateA}
              otherBalance={Number(balanceB)}
              otherPrice={priceB}
              otherChange={isChangeB}
            >
              INPUT
            </MultipleInput>
            <IconWrapper>
              <FontAwesomeIcon icon={arrowDown} className="icon" />
            </IconWrapper>
            <SingleInput
              liftState={liftStateB}
              otherBalance={Number(balanceA)}
              otherPrice={priceA}
              otherChange={isChangeA}
            >
              OUTPUT
            </SingleInput>
            {balanceA && balanceB && (
              <DetailInfoStyle>
                <div>
                  <dt>Exchange Rate</dt>
                  <dd>
                    1 KLAY = {detailInfo} {nameA}
                  </dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>10KLAY</dd>
                </div>
              </DetailInfoStyle>
            )}
            <ButtonWrapper
              numberA={Number(balanceA)}
              numberB={Number(balanceB)}
              isErrorA={isDecimalErrorA}
              isErrorB={isDecimalErrorB}
              type="button"
              onClick={clickButton}
            >
              Burn
            </ButtonWrapper>
          </>
        )}
      </form>
      <ToastPortal />
    </MintPageWrapper>
  );
};

export default MintPage;
