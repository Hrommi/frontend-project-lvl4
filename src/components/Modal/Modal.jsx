import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';

const Modal = ({
  title,
  body,
  isVisible,
  onHide,
}) => (
  <BootstrapModal show={isVisible} onHide={onHide}>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{body}</BootstrapModal.Body>
  </BootstrapModal>
);

export default Modal;
