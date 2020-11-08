import React from 'react';
import BootstrapToast from 'react-bootstrap/Toast';

const Toast = ({
  title,
  body,
  isVisible,
  onHide,
}) => (
  <BootstrapToast
    show={isVisible}
    onClose={onHide}
    style={{
      position: 'fixed',
      zIndex: '1100',
      right: 10,
      bottom: 10,
      width: 180,
    }}
  >
    <BootstrapToast.Header>
      <strong className="mr-auto">{title}</strong>
    </BootstrapToast.Header>
    {body && <BootstrapToast.Body>{body}</BootstrapToast.Body>}
  </BootstrapToast>
);

export default Toast;
