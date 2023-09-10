import React from 'react';
import { Modal } from 'flowbite-react';

export const ModalWin = ({ show, onHide, children, header }) => (
  <Modal show={show} className='animate-appear' onClose={onHide}>
    <Modal.Header>{header || ''}</Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);
