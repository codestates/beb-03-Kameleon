import styled from 'styled-components';

const LiquidityPageWrapper = styled.div`
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

    & .multi-inp {
      display: flex;
      align-items: center;
      justify-content: center;

      & > div {
        width: 45%;
      }

      & > span {
        width: 10%;
        text-align: center;
      }
    }
  }
`;

const TabStyle = styled.span`
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

const InputStyle = styled.div`
  position: relative;
  padding: 0.8rem 1.6rem;
  background-color: var(--green);
  border-radius: 0.5rem;

  & > div {
    padding: 0.5rem;
    margin-top: 0.5rem;
    background-color: var(--white);

    &.single-inp {
      width: 80%;
    }

    & > label {
      display: block;
      width: 100%;
      color: var(--gray);
      font-size: 0.8rem;
      font-weight: 700;
    }

    & > span {
      display: flex;

      & em {
        font-style: normal;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--green);
      }

      & input {
        width: 100%;
        border: 0;
        margin-top: 0.3rem;
      }
    }
  }
  & > button {
    position: absolute;
    top: 1.2rem;
    right: 1.6rem;
    width: 15%;
  }

  & > dl {
    padding: 0.5rem;
    margin-top: 2rem;
    background-color: var(--white);
    font-size: 0.8rem;
    font-weight: 700;

    & > dt {
      color: var(--gray);
    }
    & > dd {
      margin-top: 0.3rem;
      color: var(--green);
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

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  color: var(--blue);
`;

export { LiquidityPageWrapper, InputStyle, DetailInfoStyle, TabStyle };
