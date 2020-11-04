import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [toastInfo, setToastInfo] = React.useState({
    title: null,
    body: null,
    isVisible: false,
  });

  const showToast = React.useCallback(({ title, body = null }) => {
    setToastInfo({ title, body, isVisible: true });
  }, []);

  const hideToast = React.useCallback(() => {
    setToastInfo((prevToastInfo) => ({ ...prevToastInfo, isVisible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {ReactDOM.createPortal(
        <Toast
          title={toastInfo.title}
          body={toastInfo.body}
          isVisible={toastInfo.isVisible}
          onHide={hideToast}
        />,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("'useToast' must be within a 'ToastProvider'");
  }
  return context;
};

export default ToastProvider;
