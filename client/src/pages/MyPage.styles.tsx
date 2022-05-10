import styled from 'styled-components';

export const MyPageWrapper = styled.div`
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

export const MyPageList = styled.div`
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

export const MyPageBar = styled.div<{ yes: number; no: number }>`
  display: flex;
  width: 600px;
  /* border-radius: 0.5rem; */
  background-color: #ffffff;

  & > div {
    &:first-of-type {
      width: ${(props) => `calc(600px / 100 * ${props.yes})`};
      background-color: #6675ff;
    }

    &:last-of-type {
      width: ${(props) => `calc(600px / 100 * ${props.no})`};
      background-color: #ff6363;
    }
  }

  @media (max-width: 1023px) {
    display: none;
  }

  /* FF6363 */
  /* 6675FF */
`;
