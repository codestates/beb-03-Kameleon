import styled from 'styled-components';

export const LiquidityPageWrapper = styled.div`
  max-width: var(--s-width);
  margin: auto;
  position: relative;

  & > h2 {
    margin: 1rem;
    color: var(--white);
  }

  & > form {
    padding: 1rem 2rem;
    background-color: var(--white);
    border-radius: 1rem;
  }
`;

export const TabStyle = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--gray);
  border-radius: 0.25rem;
  overflow: hidden;

  & > button {
    width: 3.5rem;
    padding: 0.3rem 0.6rem;
    color: var(--white);
    font-size: 0.7rem;
    border: 0;
    background-color: transparent;

    &.on {
      background-color: var(--dark-green);
    }

    :hover {
      cursor: pointer;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  color: var(--blue);
`;

export const OutputWrapper = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  color: var(--white);
  background-color: var(--green);

  & > label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--dark-green);
  }

  & > div {
    display: flex;
    align-items: center;
    height: 2rem;
  }
`;

export const ButtonWrapper = styled.button<{
  balanceA?: string;
  balanceB?: string;
  isErrorA?: boolean;
  isErrorB?: boolean;
}>`
  display: block;
  padding: 1rem 2rem;
  margin: auto;
  margin-top: 1.5rem;
  width: 100%;
  color: var(--white);
  font-weight: 700;
  font-size: 1rem;
  background-color: var(--dark-green);
  border-radius: 1rem;
  border: 2px solid var(--dark-green);

  :hover {
    cursor: pointer;
    border: 2px solid var(--blue);
  }

  &.liquidity__addbutton {
    opacity: ${(props) =>
      Number(props.balanceA) > 0 &&
      Number(props.balanceB) > 0 &&
      !props.isErrorA &&
      !props.isErrorB
        ? ''
        : '0.7'};

    :hover {
      border: ${(props) =>
        Number(props.balanceA) > 0 &&
        Number(props.balanceB) > 0 &&
        !props.isErrorA &&
        !props.isErrorB
          ? '2px solid var(--blue)'
          : '2px solid var(--dark-green)'};
    }
  }

  &.liquidity__removebutton {
    opacity: ${(props) =>
      Number(props.balanceA) > 0 && !props.isErrorA ? '' : '0.7'};

    :hover {
      border: ${(props) =>
        Number(props.balanceA) > 0 && !props.isErrorA
          ? '2px solid var(--blue)'
          : '2px solid var(--dark-green)'};
    }
  }
`;
