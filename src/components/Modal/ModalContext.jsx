import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = React.useState({
    title: null,
    body: null,
    isVisible: false,
  });

  const showModal = React.useCallback(({ title, body }) => {
    setModalInfo({ title, body, isVisible: true });
  }, []);

  const hideModal = React.useCallback(() => {
    setModalInfo((prevModalInfo) => ({ ...prevModalInfo, isVisible: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {ReactDOM.createPortal(
        <Modal
          title={modalInfo.title}
          body={modalInfo.body}
          isVisible={modalInfo.isVisible}
          onHide={hideModal}
        />,
        document.body,
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("'useModal' must be within a 'ModalProvider'");
  }
  return context;
};

export default ModalProvider;
