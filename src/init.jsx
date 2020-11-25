import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import UserProvider from './contexts/UserContext';
import App from './App';
import getStore from './store';
import { addChannel, removeChannel, renameChannel } from './features/channels';
import { addMessage } from './features/messages';
import { ModalProvider } from './components/Modal';
import { ToastProvider } from './components/Toast';

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

  render(
    <Provider store={store}>
      <UserProvider>
        <ToastProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ToastProvider>
      </UserProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
