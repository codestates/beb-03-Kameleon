import styled from 'styled-components';

export const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.div<{ width?: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.width === undefined ? '400' : props.width)}px;
  padding: 1rem;
  border-radius: 1rem;
  z-index: 999;
  background: var(--white);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
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
