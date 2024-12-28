import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ModalBasic = ({ show = false, size = "sm", title = "", children, onClose }) => {
  return (
    <Modal show={show} size={size} centered>
      {title && (
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Button variant="close" onClick={onClose} aria-label="Close" />
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
