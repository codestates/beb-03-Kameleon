import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import {
  MultipleInputContainer,
  MultipleInputWrapper,
  MultipleInputBlank,
  MultipleInputList,
} from './MultipleInput.styles';

import useInput from '../../hooks/useInput';

import { createTokenList } from '../../utils/dummyCreator';

const angleUp = faAngleUp as IconProp;
const angleDown = faAngleDown as IconProp;

interface LayoutProps {
  children: React.ReactNode;
}

const MultipleInput = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { inputValue, isFocus, isError, setInputKey, setIsFocus, changeInput } =
    useInput();

  const tokenList = createTokenList(20);

  const clickDownIcon = useCallback(() => {
    setIsOpen(true);
    setIsFocus(true);
  }, [setIsOpen, setIsFocus]);

  const clickUpIcon = useCallback(() => {
    setIsOpen(false);
    setIsFocus(false);
  }, [setIsOpen, setIsFocus]);

  return (
    <MultipleInputContainer isFocus={isFocus} isError={isError}>
      <div>
        <label htmlFor="input">{children}</label>
        <MultipleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>kSAMSUNG</div>
            {isOpen ? (
              <FontAwesomeIcon
                icon={angleUp}
                className="icon"
                onClick={clickUpIcon}
              />
            ) : (
              <FontAwesomeIcon
                icon={angleDown}
                className="icon"
                onClick={clickDownIcon}
              />
            )}
          </section>
          <input
            placeholder="0.000000"
            id="input"
            autoComplete="off"
            value={inputValue || ''}
            onKeyDown={(e) => setInputKey(e.key)}
            onChange={(e) => changeInput(e)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </MultipleInputWrapper>
        {isOpen && (
          <>
            <MultipleInputBlank />
            <MultipleInputList>
              {tokenList.map((el) => (
                <li key={el.id}>{el.name}</li>
              ))}
            </MultipleInputList>
          </>
        )}
      </div>
      {isError && <section>Required</section>}
    </MultipleInputContainer>
  );
};

export default MultipleInput;
