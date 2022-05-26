import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  max-width: var(--width);
  margin: 0 auto;
  color: var(--dark-green);

  & > .subtit {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--white);
  }

  .pool__balance,
  .asset__value {
    flex: 1.5;
  }

  .pool__balance {
    @media (max-width: 760px) {
      display: none;
    }
  }

  .mypage__bar {
    width: 80%;
  }
`;

export const MyPageList = styled.ul`
  border-radius: 0.5rem;
  background-color: var(--white);

  & > div {
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 2px solid var(--green);
    font-size: 1.2rem;
    font-weight: 600;
  }

  & > div > span {
    flex: 1;
    text-align: right;
    color: var(--green);
    padding-left: 0.5rem;

    :first-of-type {
      text-align: left;
      padding-left: 0;
    }
  }

  @media (max-width: 760px) {
    & > div {
      padding: 0.6rem 0.8rem;
    }
  }
`;

export const MyPageItem = styled.li`
  display: flex;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--white);
  font-size: 1.2rem;
  font-weight: 600;

  & > div {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 1rem;
    padding-left: 0.5rem;
    text-align: right;
    flex-basis: 1rem;
    overflow: auto;

    :first-of-type {
      padding-left: 0;
      text-align: left;
    }

    &.mypage__bar {
      padding: 0 24px;
    }
  }

  :last-of-type {
    border: 0;
  }

  @media (max-width: 760px) {
    padding: 0.6rem 0.8rem;
  }
`;

export const MyPageBar = styled.div<{
  yes: number;
  no: number;
  totalSupply: string;
}>`
  margin: 0 0.5rem 0 0.5rem;
  display: flex;
  flex: 4 !important;
  /* margin-left: -2rem; */
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
