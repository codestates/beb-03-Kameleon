import styled from 'styled-components';

export const MainPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: #ffffff;

  & > h2 {
    display: flex;

    @media (max-width: 1200px) {
      padding-left: 1rem;
    }
  }
`;

export const MainPageSearch = styled.div`
  display: flex;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #276955;

  & > input {
    width: 100%;
    border: 1px solid #276955;
    outline: none;
    background-color: #276955;
    color: white;
    font-size: 1rem;
  }

  & > button {
    width: 160px;
    height: 2rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: #ffffff;
    color: #276955;
    font-size: 1rem;
    font-weight: 600;

    :hover {
      cursor: pointer;
    }
  }
`;

export const MainPageList = styled.div`
  border-radius: 0.5rem;
  background-color: #276955;

  & > div {
    display: flex;
    justify-content: space-between;
    min-height: 1.5rem; // temp
    padding: 1rem 0;
    margin: 0 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-bottom: 1px solid #fff;

    :last-of-type {
      border: 0;
    }
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
