import React, { useState } from 'react';

import {
  SingleInputContainer,
  SingleInputWrapper,
} from './styles/SingleInput.styles';

import useInput from '../../hooks/useInput';
import {
  PollInput,
  PollForm,
  PollWrapper,
  PollLabel,
} from './styles/GovernInput.styles';
import { callCaver, sendContract } from '../../utils/KAS';
import { contractAddressTable } from '../../constants';

interface LayoutProps {
  children: React.ReactNode;
  pollId: string;
}

const GovernInput = ({ children, pollId }: LayoutProps) => {
  const tokenName = 'Kameleon';
  const numberOfDecimal = 18;
  const {
    tokenBalance,
    isFocus,
    isBlankError,
    isDecimalError,
    setKey,
    setIsFocus,
    changeInput,
  } = useInput(numberOfDecimal);

  const [isAgree, setIsAgree] = useState<boolean | null>(null);
  const [yesFocus, setYesFocus] = useState<boolean>(false);
  const [noFocus, setNoFocus] = useState<boolean>(false);

  const yesOnClickHander = () => {
    if (yesFocus === true) {
      setYesFocus(false);
      setIsAgree(null);
    } else {
      setIsAgree(true);
      setYesFocus(true);
      setNoFocus(false);
    }
  };
  const noOnClickHander = () => {
    if (noFocus === true) {
      setNoFocus(false);
      setIsAgree(null);
    } else {
      setIsAgree(false);
      setNoFocus(true);
      setYesFocus(false);
    }
  };

  const buttonOnClickHander = async () => {
    console.log(typeof tokenBalance);
    if (isAgree !== null) {
      console.log(pollId, isAgree, tokenBalance);
      const result = await sendContract({
        contractName: 'Govern',
        contractAddress: contractAddressTable['Govern'],
        methodName: 'vote',
        parameters: [
          pollId,
          callCaver.utils.convertToPeb(tokenBalance, 'KLAY'),
          isAgree,
        ],
      });
      console.log(result);
    }
  };

  return (
    <>
      <PollForm>
        <PollWrapper>
          <PollInput
            type="radio"
            name="answer"
            id="yes"
            hidden={true}
            onClick={yesOnClickHander}
            value="yes"
          />
          <PollLabel isAgree={isAgree} value={'yes'} htmlFor="yes">
            yes
          </PollLabel>
        </PollWrapper>
        <PollWrapper>
          <PollInput
            type="radio"
            name="answer"
            id="no"
            hidden={true}
            onClick={noOnClickHander}
            value="no"
          />
          <PollLabel isAgree={isAgree} value={'no'} htmlFor="no">
            no
          </PollLabel>
        </PollWrapper>
      </PollForm>
      <SingleInputContainer
        isFocus={isFocus}
        isError={isBlankError || isDecimalError}
      >
        <div>
          <label htmlFor="input">{children}</label>
          <SingleInputWrapper>
            <section>
              <div>{tokenName}</div>
            </section>
            <input
              placeholder="0.00"
              id="input"
              autoComplete="off"
              value={tokenBalance}
              onKeyDown={(e) => setKey(e.key)}
              onChange={(e) => changeInput(e)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </SingleInputWrapper>
        </div>
        {/* 에러 메세지 */}
        {isDecimalError && (
          <section>
            Amount must be within {numberOfDecimal} decimal points
          </section>
        )}
        {isBlankError && <section>Required</section>}
      </SingleInputContainer>
      <br></br>
      <button onClick={buttonOnClickHander}>vote</button>
      <br></br>
    </>
  );
};

export default GovernInput;
