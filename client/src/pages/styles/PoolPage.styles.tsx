import styled from 'styled-components';

export const PoolPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--green);

  & a {
    color: var(--dark-green);
  }
`;

export const PoolPageList = styled.ul`
  border-radius: 0.5rem;
  background-color: var(--white);

  & > div {
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 2px solid var(--green);
    font-size: 1rem;
  }

  & > div > span {
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

  & > div {
    flex: 1;
    text-align: right;
    font-weight: 700;

    :first-of-type {
      flex: 1.5;
      text-align: left;
    }

    &.main__oracle {
      font-weight: 400;
    }
  }

  :last-of-type {
    border: 0;
  }
`;
