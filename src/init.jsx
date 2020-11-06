import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import UserProvider from './contexts/UserContext';
import App from './App';
import store from './store';
import { setChannels, setCurrentChannelId } from './features/channels';
import { setMessages, addMessage } from './features/messages';
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
    <UserProvider>
      <ToastProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToastProvider>
    </UserProvider>,
    document.getElementById('chat'),
  );
};
