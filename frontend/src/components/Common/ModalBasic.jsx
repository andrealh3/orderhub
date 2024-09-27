import React from 'react'
import { Modal } from 'react-bootstrap'

export const ModalBasic = ({ show = false, size = "sm", title = "", children, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size={size}>
      { title &&
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      }
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}