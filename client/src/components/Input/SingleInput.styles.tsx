import styled from 'styled-components';

export const SingleInputContainer = styled.div<{
  isFocus: boolean;
  isError: boolean;
}>`
  & > div {
    border: 2px solid
      ${(props) =>
        props.isError
          ? 'var(--red)'
          : props.isFocus
          ? 'var(--blue)'
          : 'var(--green)'};
    border-radius: 1rem;
    background-color: var(--green);
    padding: 1rem 1.5rem;
  }

  & > div > label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--dark-green);
  }

  & > section {
    margin-top: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--red);
    text-align: right;
  }
`;

export const SingleInputWrapper = styled.div`
  display: flex;

  & > section {
    display: flex;
    align-items: center;
  }

  /* temp */
  & > section > img {
    margin-right: 0.5%;
  }

  & > section > div {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--white);
  }

  & > input {
    flex: auto;
    width: 100%;
    height: 2rem;
    border: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--white);
    background-color: var(--green);
    outline: none;
    text-align: right;

    ::placeholder {
      color: var(--dark-green);
    }
  }
`;
