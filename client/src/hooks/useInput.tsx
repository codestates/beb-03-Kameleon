import React, { useState, useCallback } from 'react';

const useInput = (decimal: number) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDecimalError, setIsDecimalError] = useState(false);

  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 입력받은 키값에 대한 조건문(숫자, 삭제 or 소수점)
      if (
        !!parseInt(inputKey) ||
        inputKey === 'Backspace' ||
        inputKey === 'Delete'
      ) {
        setInputValue(e.target.value);

        // 소수점 체크 Logic
        // 소수점 에러 핸들링
        const [, n] = e.target.value.split('.');
        if (n && n.length > decimal) {
          setIsDecimalError(true);
        } else {
          setIsDecimalError(false);
        }

        // Mint Page로 상태 끌어올리기
        // handler(e.target.value);
      } else if (
        inputKey === '.' &&
        e.target.value.match(/\./g)?.length === 1
      ) {
        setInputValue(e.target.value);

        // Mint Page로 상태 끌어올리기
        // handler(e.target.value);
      }

      // 빈 값 에러 핸들링
      if (e.target.value) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    },
    [inputKey, decimal]
  );

  return {
    inputValue,
    isFocus,
    isError,
    isDecimalError,
    setInputKey,
    setIsFocus,
    changeInput,
  };
};

export default useInput;
