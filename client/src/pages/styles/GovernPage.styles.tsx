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
      opacity: 0.8;
    }
  }

  @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`;

export const GovernPagePollList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GovernPagePollItem = styled.div<{ yes: number; no: number }>`
  width: calc(50% - 1rem);
  height: 12rem;
  margin: 0.5rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--dark-green);
  opacity: ${(props) => (props.yes + props.no < 20 ? '' : '0.7')};

  & > section > div {
    font-weight: 600;
    color: ${(props) =>
      props.yes + props.no < 20
        ? 'var(--white)'
        : props.yes > props.no
        ? 'var(--blue)'
        : 'var(--red)'};
  }

  & > section > h2 {
    margin-bottom: 1rem;
  }

  & > p {
    color: var(--deep-green);
  }

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const GovernPageBar = styled.div<{ yes: number; no: number }>`
  display: flex;
  min-width: 100%;
  height: 1rem;
  background-color: var(--white);

  & > div {
    &:first-of-type {
      width: ${(props) => `calc(100% / 100 * ${props.yes})`};
      background-color: var(--blue);
    }

    &:last-of-type {
      width: ${(props) => `calc(100% / 100 * ${props.no})`};
      background-color: var(--red);
    }
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
