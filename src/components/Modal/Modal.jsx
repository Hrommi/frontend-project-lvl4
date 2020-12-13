import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';

const Modal = ({
  title,
  onHide,
  children,
}) => (
  <BootstrapModal show onHide={onHide}>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
  </BootstrapModal>
);

export default Modal;
