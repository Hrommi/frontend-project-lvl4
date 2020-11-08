import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import UserProvider from './contexts/UserContext';
import App from './App';
import store from './store';
import { setChannels, setCurrentChannelId } from './features/channels';
import { setMessages, addMessage } from './features/messages';
import { ModalProvider } from './components/Modal';
import { ToastProvider } from './components/Toast';

export default ({ channels, currentChannelId, messages }) => {
  const socket = io();

  store.dispatch(setChannels({ channels }));
  store.dispatch(setCurrentChannelId({ channelId: currentChannelId }));
  store.dispatch(setMessages({ messages }));
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
