import styled from 'styled-components';

const SwapPageWrapper = styled.div`
  max-width: var(--s-width);
  margin: auto;

  & > h2 {
    margin: 1rem;
    color: var(--white);
  }

  & > form {
    padding: 1rem 2rem;
    background-color: var(--white);
    border-radius: 1rem;

    & > button {
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
      border: 0;
    }
  }
`;

const InputStyle = styled.div`
  margin-top: 2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--green);
  border-radius: 0.5rem;

  &:first-child {
    margin-top: 0;
  }

  & > label {
    color: var(--white);
    font-size: 0.8rem;
    font-weight: 700;
  }

  & > div {
    display: flex;
    width: 100%;
    padding: 0.3rem;
    margin-top: 0.5rem;
    background-color: var(--white);

    & > button {
      width: 35%;
      border: 0;
      background-color: transparent;
      text-align: left;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--green);
      cursor: pointer;

      & img {
        display: inline-block;
        width: 45px;
        margin-right: 0.25rem;
        vertical-align: middle;
      }
    }

    & input {
      width: 65%;
      border: 0;
      text-align: right;
    }
  }
`;

const DetailInfoStyle = styled.dl`
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid var(--green);

  & > div {
    display: flex;
    font-size: 0.8rem;
  }

  & dt {
    width: 35%;
    color: var(--gray);
  }

  & dd {
    width: 65%;
    color: var(--green);
    font-weight: 700;
    text-align: right;
  }
`;

export { SwapPageWrapper, InputStyle, DetailInfoStyle };
