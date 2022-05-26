import React from 'react';
import ReactDOM from 'react-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import {
  ModalBackDrop,
  ModalWrapper,
  ModalHeader,
  ModalCloseButton,
} from './ModalPortal.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modalContent: JSX.Element;
  width?: number;
}

const xMark = faXmark as IconProp;

const ModalPortal = ({
  isOpen,
  closeModal,
  width,
  modalContent,
}: ModalProps) => {
  const modal = (
    <>
      <ModalBackDrop onClick={closeModal} />
      <ModalWrapper width={width}>
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

export default ModalPortal;
