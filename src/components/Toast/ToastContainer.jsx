import React from 'react';
import { DefaultToastContainer } from 'react-toast-notifications';

const ToastContainer = (props) => (
  <DefaultToastContainer
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{ zIndex: 1060 }}
  />
);

export default ToastContainer;
