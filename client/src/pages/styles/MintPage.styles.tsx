import styled from 'styled-components';

const MintPageWrapper = styled.div`
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

      :hover {
        cursor: pointer;
        opacity: 0.8;
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
    padding: 0.3rem 0.6rem;
    color: var(--white);
    font-size: 0.7rem;
    border: 0;
    background-color: transparent;

    &.on {
      background-color: var(--dark-green);
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

export { MintPageWrapper, DetailInfoStyle, TabStyle };
