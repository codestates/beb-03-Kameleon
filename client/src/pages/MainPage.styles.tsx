import styled from 'styled-components';

export const MainPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--white);

  & > h2 {
    margin: 1rem;
  }

  .main__oracle {
    @media (max-width: 1023px) {
      display: none;
    }
  }

  .main__usd {
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
  background-color: var(--dark-green);

  & > input {
    width: 100%;
    border: 0;
    font-size: 1rem;
    color: white;
    background-color: var(--dark-green);
    outline: none;
  }

  & > button {
    width: 120px;
    height: 2rem;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark-green);
    background-color: var(--white);

    :hover {
      cursor: pointer;
    }
  }
`;

export const MainPageList = styled.ul`
  border-radius: 0.5rem;
  background-color: var(--dark-green);

  & > div {
    display: flex;
    margin: 0 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--white);
    font-size: 1.2rem;
    font-weight: 600;
  }

  & > div > div {
    flex: 1;
    text-align: right;

    :first-of-type {
      flex: 1.5;
      text-align: left;
    }
  }
`;

export const MainPageItem = styled.li`
  display: flex;
  margin: 0 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--white);
  font-size: 1.2rem;
  font-weight: 600;

  & > div {
    flex: 1;
    text-align: right;

    :first-of-type {
      flex: 1.5;
      text-align: left;
    }
  }

  :last-of-type {
    border: 0;
  }
`;
