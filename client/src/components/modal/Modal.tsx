import React from 'react';
import ReactDOM from 'react-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import {
  ModalBackDrop,
  ModalWrapper,
  ModalHeader,
  ModalCloseButton,
} from './Modal.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalContent: JSX.Element;
}

const xMark = faXmark as IconProp;

const Modal = ({ isOpen, closeModal, modalContent }: ModalProps) => {
  const modal = (
    <>
      <ModalBackDrop onClick={closeModal} />
      <ModalWrapper>
        <ModalHeader>
          <ModalCloseButton onClick={closeModal}>
            <FontAwesomeIcon icon={xMark} />
          </ModalCloseButton>
        </ModalHeader>
        {modalContent}
      </ModalWrapper>
    </>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
