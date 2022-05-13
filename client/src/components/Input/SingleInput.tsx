import React, { useEffect } from 'react';

import { SingleInputContainer, SingleInputWrapper } from './SingleInput.styles';

import useInput from '../../hooks/useInput';

interface LayoutProps {
  children: React.ReactNode;
  liftState: (value: string, name: string, isDecimalError: boolean) => void;
}

const SingleInput = ({ children, liftState }: LayoutProps) => {
  const {
    inputValue,
    isFocus,
    isError,
    isDecimalError,
    setInputKey,
    setIsFocus,
    changeInput,
  } = useInput(2);

  useEffect(() => {
    liftState(inputValue, 'KLY', isDecimalError);
  }, [liftState, inputValue, isDecimalError]);

  return (
    <SingleInputContainer isFocus={isFocus} isError={isError || isDecimalError}>
      <div>
        <label htmlFor="input">{children}</label>
        <SingleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>KLAY</div>
          </section>
          <input
            placeholder="0.00"
            id="input"
            autoComplete="off"
            value={inputValue || ''}
            onKeyDown={(e) => setInputKey(e.key)}
            onChange={changeInput}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </SingleInputWrapper>
      </div>
      {/* error */}
      {isDecimalError && (
        <section>Amount must be within 6 decimal points</section>
      )}
      {isError && <section>Required</section>}
    </SingleInputContainer>
  );
};

export default SingleInput;
