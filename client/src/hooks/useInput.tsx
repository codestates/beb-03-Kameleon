import React, { useCallback, useState } from 'react';

export interface IUseInput {
  tokenBalance: string;
  isFocus: boolean;
  isBlankError: boolean;
  isDecimalError: boolean;
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  setTokenBalance: React.Dispatch<React.SetStateAction<string>>;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  changeInput: any;
}

const useInput = (decimal: number) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isBlankError, setIsBlankError] = useState<boolean>(false);
  const [isDecimalError, setIsDecimalError] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState<string>('');

  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 입력 받은 키 값에 대한 조건(숫자, 삭제 or 소수점)
      if (
        !!parseInt(key) ||
        key === 'Backspace' ||
        key === 'Delete' ||
        key === '0'
      ) {
        setTokenBalance(e.target.value);

        // 소수점 갯수에 대한 조건
        // 소수점 에러 핸들링
        const [, n] = e.target.value.split('.');
        if (n && n.length > decimal) {
          setIsDecimalError(true);
        } else {
          setIsDecimalError(false);
        }
      } else if (key === '.' && e.target.value.match(/\./g)?.length === 1) {
        setTokenBalance(e.target.value);
      }

      // 비어있는 값인지에 대한 조건
      // 비어있는 값 에러 핸들링
      if (e.target.value) {
        setIsBlankError(false);
      } else {
        setIsBlankError(true);
      }
      setIsChange(true);
    },
    [key, decimal]
  );

  return {
    tokenBalance,
    isFocus,
    isBlankError,
    isDecimalError,
    isChange,
    setIsChange,
    setTokenBalance,
    setKey,
    setIsFocus,
    changeInput,
  };
};

export default useInput;
