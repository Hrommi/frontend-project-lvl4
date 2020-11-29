import React from 'react';
import ModalContext from './ModalContext';

const useModal = ({ type, title, component }) => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("'useModal' must be within a 'ModalProvider'");
  }

  React.useEffect(() => {
    context.addModal({ type, component });

    return () => {
      context.hideModal();
    };
  }, []);

  const showModal = React.useCallback((props) => {
    context.showModal({ type, title, props });
  }, []);

  const hideModal = React.useCallback(() => {
    context.hideModal();
  }, []);

  return { showModal, hideModal };
};

export default useModal;
