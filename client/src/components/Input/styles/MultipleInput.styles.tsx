import styled from 'styled-components';

export const MultipleInputContainer = styled.div<{
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

  .icon {
    color: white;
    padding: 0.5rem 0.5rem;

    :hover {
      cursor: pointer;
    }
  }
`;

export const MultipleInputWrapper = styled.div`
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

export const MultipleInputBlank = styled.div`
  margin: 0 -1.5rem;
  height: 1rem;
  border-bottom: 1px solid var(--dark-green);
`;

export const MultipleInputList = styled.ul`
  margin: 0 -1.5rem;
  height: 20rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  & > li {
    color: var(--white);
    padding: 1.5rem 1.5rem;

    :hover {
      cursor: pointer;
      background-color: var(--dark-green);
    }
  }
`;
