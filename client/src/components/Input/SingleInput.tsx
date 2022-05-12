import React from 'react';

import { SingleInputContainer, SingleInputWrapper } from './SingleInput.styles';

import useInput from '../../hooks/useInput';

interface LayoutProps {
  children: React.ReactNode;
}

const SingleInput = ({ children }: LayoutProps) => {
  const { inputValue, isFocus, isError, setInputKey, setIsFocus, changeInput } =
    useInput();

  return (
    <SingleInputContainer isFocus={isFocus} isError={isError}>
      <div>
        <label htmlFor="input">{children}</label>
        <SingleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>KLY</div>
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
      {isError && <section>Required</section>}
    </SingleInputContainer>
  );
};

export default SingleInput;
