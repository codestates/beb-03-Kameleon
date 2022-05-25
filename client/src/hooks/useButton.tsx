import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Caver from 'caver-js';

import { login, logout } from '../store/user';
import { sendContract, sendApprove } from '../utils/KAS';
import { exchangeAddressTable } from '../constants';

const caver = new Caver();

const useButton = () => {
  const dispatch = useDispatch();

  // Add Liquidity
  // (name: kStock 이름 BalanceA: KLAY 수량, BalanceB: kStock 수량)
  const addButton = useCallback(
    async (name: string, balanceA: string, balanceB: string) => {
      await sendContract({
        contractName: 'Exchange',
        contractAddress: exchangeAddressTable[name],
        methodName: 'addLiquidity',
        amount: balanceA, // klay
        parameters: [caver.utils.toBN(Number(balanceB) * 1000000000000000000)],
      });
    },
    []
  );

  // Remove Liquidity
  // (name: kStock 이름, Balance: LP 수량)
  const removeButton = useCallback((name: string, balance: string) => {
    sendContract({
      contractName: 'Exchange',
      contractAddress: exchangeAddressTable[name],
      methodName: 'removeLiquidity',
      parameters: [caver.utils.convertToPeb(balance, 'KLAY')],
    });
  }, []);

  // Connect Wallet
  const connectButton = useCallback(async () => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn.isKaikas) {
        const accounts = await window.klaytn.enable();
        dispatch(login(accounts[0]));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
      alert('Kaikas 설치하시기 바랍니다.');
    }
  }, [dispatch]);

  // Apporve Token
  // (name: kStock 이름)
  const approveButton = useCallback(async (name: string) => {
    const result = await sendApprove({ stockName: name });
    return result;
  }, []);

  return { addButton, removeButton, connectButton, approveButton };
};

export default useButton;
