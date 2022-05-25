import styled from 'styled-components';

export const GovernPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--dark-green);
`;

export const GovernPageGovernList = styled.div`
  display: flex;

  & h3 {
    font-size: 2rem;
  }

  & > div {
    width: 100%;
    height: 20rem;
    margin: 0.5rem;
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: var(--white);
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & > div:first-of-type {
    flex: 2;

    @media (max-width: 1023px) {
      flex: auto;
    }
  }

  & > div:last-of-type {
    flex: 1;

    @media (max-width: 1023px) {
      flex: auto;
    }
  }

  & > div > div > p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--deep-green);
  }

  & > div > div > div {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & button {
    height: 3rem;
    margin-top: 1rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background-color: var(--dark-green);

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

export const GovernPagePollList = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div:hover {
    cursor: pointer;
    border: solid 2px #66adff;
  }
`;

export const GovernPagePollItem = styled.div<{
  isExpired?: boolean | undefined;
  enoughQuorum?: boolean | undefined;
  yes: number;
  no: number;
}>`
  width: calc(50% - 1rem);
  height: 12rem;
  margin: 0.5rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--white);
  opacity: ${(props) => (props.isExpired === true ? '0.5' : '1')};

  transition: border-color 0.2s;
  border: 2px solid transparent;

  & > section > div {
    font-weight: 600;
    color: ${(props) =>
      !props.isExpired
        ? 'var(--green)'
        : props.enoughQuorum && props.yes > props.no
        ? 'var(--blue)'
        : 'var(--red)'};
  }

  & > section > span {
    display: block;
    margin-top: 1rem;

    & b {
      font-size: 1rem;
      font-weight: 400;
    }

    & em {
      margin-left: 0.2rem;
      color: var(--deep-green);
      font-weight: 700;
      font-size: 1.3rem;
      font-style: normal;
    }
  }

  & > p {
    color: var(--deep-green);
  }

  & ::hover {
    border: solid 1px #66adff;
  }

  & > div:last-child {
    margin-top: 0.6rem;
    text-align: right;
    font-size: 0.8rem;
  }

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const GovernPageBar = styled.div<{
  yes: number;
  no: number;
  totalSupply: string;
}>`
  display: flex;
  min-width: 100%;
  height: 1rem;
  border: 1px solid var(--dark-green);

  & > div {
    &:first-of-type {
      width: ${(props) => {
        const calcPercent = (props.yes / +props.totalSupply) * 100;
        return `${calcPercent}%`;
      }};
      background-color: var(--blue);
    }

    &:last-of-type {
      width: ${(props) => {
        const calcPercent = (props.no / +props.totalSupply) * 100;
        return `${calcPercent}%`;
      }};
      background-color: var(--red);
    }
  }
`;

export const GoverQuorum = styled.div<{ percentage: string }>`
  position: relative;
  margin-top: 1rem;
  font-size: 12px;
  height: 25px;

  & > div {
    left: ${(props) => `${props.percentage}%`};
    position: absolute;
    top: 0;
    color: var(--green);
    font-size: inherit;
    font-weight: 600;
    height: 25px;
    transform: translate(-50%);
  }

  & > div ::after {
    content: '';
    width: 2px;
    height: 8px;
    background: var(--green);
    position: absolute;
    left: 50%;
    bottom: 0;
  }
`;

export const GovernPageModalContent = styled.div`
  margin: 1rem 0;

  & label {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  & input {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background-color: var(--green);
    outline: none;
  }

  & button {
    width: 100%;
    height: 3rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background-color: var(--deep-green);

    :hover {
      cursor: pointer;
    }
  }
`;
