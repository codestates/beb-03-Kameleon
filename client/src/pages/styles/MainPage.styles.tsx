import styled from 'styled-components';

export const MainPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--white);

  .main__oracle {
    @media (max-width: 1023px) {
      display: none;
    }
  }
`;

export const MainPageSearch = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--white);

  & > input {
    width: 100%;
    border: 0;
    font-size: 1rem;
    color: white;
    background-color: var(--white);
    outline: none;
  }

  & > button {
    width: 120px;
    height: 2rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background-color: var(--green);

    :hover {
      cursor: pointer;
    }
  }
`;

export const MainPageList = styled.ul`
  border-radius: 0.5rem;
  /* background-color: var(--dark-green); */
  background-color: var(--white);

  & > div {
    display: flex;
    padding: 0 2rem;
    border-bottom: 2px solid var(--green);

    span {
      flex: 1;
      padding: 1rem 0;
      font-size: 1rem;
      text-align: right;
      color: var(--green);

      &:nth-of-type(1) {
        flex: 1.5;
        text-align: left;
      }
    }
  }

  & > div > span > i {
    font-size: 0.9rem;
    font-style: normal;

    @media (max-width: 760px) {
      display: none;
    }
  }
`;

export const MainPageItem = styled.li`
  & > a {
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--white);
    font-size: 1.2rem;
    color: var(--white);

    & > span {
      flex: 1;
      text-align: right;
      color: var(--dark-green);

      :first-of-type {
        flex: 1.5;
        text-align: left;
      }

      em {
        font-style: normal;
        font-size: 0.8rem;
        color: var(--green);
      }
    }

    :last-of-type {
      border: 0;
    }

    .main__name,
    .main__price {
      font-weight: 700;
    }

    /* 
    .main__usd {
      @media (max-width: 1023px) {
        display: none;
      }
    } */
  }
`;
