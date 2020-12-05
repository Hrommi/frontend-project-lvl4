import React from 'react';
import ReactDOM from 'react-dom';
import ModalContext from './ModalContext';
import Modal from './Modal';

const Body = ({ modals, type, props }) => {
  if (!modals.has(type)) {
    throw new Error(`Unknown modal type '${type}'`);
  }
  const Component = modals.get(type);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

const ModalProvider = ({ modals, children }) => {
  const addModal = ({ type, component }) => {
    if (!modals.has(type)) {
      modals.add(type, component);
    }
  };

  const [modalInfo, setModalInfo] = React.useState({
    title: null,
    type: null,
    props: {},
    isVisible: false,
  });

  const showModal = ({ type, title, props }) => {
    setModalInfo({
      type,
      title,
      props,
      isVisible: true,
    });
  };

  const hideModal = () => {
    setModalInfo((prevModalInfo) => ({ ...prevModalInfo, isVisible: false }));
  };

  return (
    <ModalContext.Provider value={{ addModal, showModal, hideModal }}>
      {children}
      {ReactDOM.createPortal(
        <Modal
          title={modalInfo.title}
          body={<Body modals={modals} type={modalInfo.type} props={modalInfo.props} />}
          isVisible={modalInfo.isVisible}
          onHide={hideModal}
        />,
        document.body,
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
