import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserProvider from './contexts/UserContext';
import App from './App';
import getStore from './store';
import { addChannel, removeChannel, renameChannel } from './features/channels';
import { addMessage } from './features/messages';
import { ModalProvider, createModals } from './components/Modal';
import { ToastProvider } from './components/Toast';
import './i18n';

export default (preloadedState, socket) => {
  const store = getStore(preloadedState);

  socket.on('newChannel', ({ data }) => {
    store.dispatch(addChannel({ channel: data.attributes }));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannel({ channelId: data.id }));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(renameChannel({ channelId: data.id, channelName: data.attributes.name }));
  });
  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ message: data.attributes }));
  });

  const modals = createModals();

  render(
    <Provider store={store}>
      <UserProvider>
        <ToastProvider>
          <ModalProvider modals={modals}>
            <App />
          </ModalProvider>
        </ToastProvider>
      </UserProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
