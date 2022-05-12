import React, { useState, useCallback } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        !!parseInt(inputKey) ||
        inputKey === 'Backspace' ||
        inputKey === 'Delete'
      ) {
        setInputValue(e.target.value);
      } else if (
        inputKey === '.' &&
        e.target.value.match(/\./g)?.length === 1
      ) {
        setInputValue(e.target.value);
      }

      if (e.target.value) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    },
    [inputKey]
  );

  return { inputValue, isFocus, isError, setInputKey, setIsFocus, changeInput };
};

export default useInput;
