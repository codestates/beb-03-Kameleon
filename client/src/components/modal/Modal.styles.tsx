import styled from 'styled-components';

export const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.div<{ width: number | undefined }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width === undefined ? '400' : props.width)}px;
  max-height: 700px;
  padding: 1rem;
  border-radius: 1rem;
  z-index: 999;
  background: var(--white);
  box-shadow: var(--shadowSharp);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
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
