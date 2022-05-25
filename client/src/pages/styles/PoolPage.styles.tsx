import styled from 'styled-components';

export const PoolPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--white);

  & a {
    color: var(--white);
  }
`;

export const PoolPageList = styled.ul`
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

export const PoolPageItem = styled.li`
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
