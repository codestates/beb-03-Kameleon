import styled from 'styled-components';

export const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalWrapper = styled.div<{ width: number | undefined }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width === undefined ? '400' : props.width)}px;
  max-height: 700px;
  padding: 1rem;
  border-radius: 1rem 0.5rem 0.5rem 1rem;
  z-index: 999;
  background: var(--white);
  box-shadow: var(--shadowSharp);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ModalHeader = styled.div`
  margin: 15px;
  position: fixed;
  right: 0;
  top: 0;
`;

export const ModalCloseButton = styled.button`
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  background: none;

  :hover {
    cursor: pointer;
  }
`;
