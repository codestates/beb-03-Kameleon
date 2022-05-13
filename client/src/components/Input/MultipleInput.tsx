import React, { useState, useCallback, useEffect } from 'react';
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
  liftState: (value: string, name: string, isDecimalError: boolean) => void;
}

interface TokenListProps {
  id: number;
  name: string;
}

// interface TokenListProps extends Array<TokenListItemProps> {
//   test: string;
// }

const MultipleInput = ({ children, liftState }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tokenList, setTokenList] = useState<Array<TokenListProps>>([]);
  const [name, setName] = useState<string>('kSAMSUNG');
  const {
    inputValue,
    isFocus,
    isError,
    isDecimalError,
    setInputKey,
    setIsFocus,
    changeInput,
  } = useInput(6);

  useEffect(() => {
    setTokenList(createTokenList(20));
  }, []);

  useEffect(() => {
    liftState(inputValue, name, isDecimalError);
  }, [liftState, inputValue, name, isDecimalError]);

  const clickDownIcon = useCallback(() => {
    setIsOpen(true);
    setIsFocus(true);
  }, [setIsFocus]);

  const clickUpIcon = useCallback(() => {
    setIsOpen(false);
    setIsFocus(false);
  }, [setIsFocus]);

  return (
    <MultipleInputContainer
      isFocus={isFocus}
      isError={isError || isDecimalError}
    >
      <div>
        <label htmlFor="input">{children}</label>
        <MultipleInputWrapper>
          <section>
            {/* temp */}
            {/* <img /> */}
            <div>{name}</div>
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
                <li key={el.id} onClick={() => setName(el.name)}>
                  {el.name}
                </li>
              ))}
            </MultipleInputList>
          </>
        )}
      </div>
      {/* error */}
      {isDecimalError && (
        <section>Amount must be within 6 decimal points</section>
      )}
      {isError && <section>Required</section>}
    </MultipleInputContainer>
  );
};

export default MultipleInput;
