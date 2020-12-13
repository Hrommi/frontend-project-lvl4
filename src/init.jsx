import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import UserProvider from './contexts/UserContext';
import App from './App';
import createStore from './redux';
import { addChannel, removeChannel, renameChannel } from './features/channels';
import { addMessage } from './features/messages';
import ToastContainer from './components/Toast';
import ModalRoot from './ModalRoot';

export default ({ channels, currentChannelId, messages }, socket) => {
  const preloadedState = {
    channelsInfo: {
      channels,
      currentChannelId,
    },
    messages,
  };
  const store = createStore(preloadedState);

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
        <ToastProvider
          components={{ ToastContainer }}
          placement="bottom-right"
          autoDismiss
        >
          <App />
          <ModalRoot />
        </ToastProvider>
      </UserProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};
