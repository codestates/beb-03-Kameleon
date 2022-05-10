import styled from 'styled-components';

export const PoolPageWrapper = styled.div`
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

export const PoolPageList = styled.div`
  border-radius: 0.5rem;
  background-color: #276955;

  & > div {
    flex: 1;
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
`;
