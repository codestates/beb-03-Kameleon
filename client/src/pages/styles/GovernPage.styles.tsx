import styled from 'styled-components';

export const GovernPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--white);

  & > h2 {
    margin: 1rem;
  }
`;

export const GovernPageGovernList = styled.div`
  display: flex;

  & > div {
    width: 100%;
    height: 20rem;
    margin: 0.5rem;
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: var(--dark-green);
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
    background-color: var(--deep-green);

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
  background-color: var(--dark-green);
  opacity: ${(props) => (props.isExpired === true ? '0.7' : '1')};

  transition: border-color 0.2s;
  border: 2px solid transparent;

  & > section > div {
    font-weight: 600;
    color: ${(props) =>
      !props.isExpired
        ? 'var(--white)'
        : props.enoughQuorum && props.yes > props.no
        ? 'var(--blue)'
        : 'var(--red)'};
  }

  & > section > h2 {
    margin-bottom: 1rem;
  }

  & > p {
    color: var(--deep-green);
  }

  & ::hover {
    border: solid 1px #66adff;
  }

  & > div:last-child {
    position: relative;
    & > div {
      position: absolute;
      right: 0;
    }
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
  background-color: var(--white);

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
  font-size: 12px;
  height: 25px;

  & > div {
    left: ${(props) => `${props.percentage}%`};
    position: absolute;
    top: 0;
    color: white;
    font-size: inherit;
    font-weight: 600;
    height: 25px;
    transform: translate(-50%);
  }

  & > div ::after {
    content: '';
    width: 2px;
    height: 8px;
    background: white;
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
