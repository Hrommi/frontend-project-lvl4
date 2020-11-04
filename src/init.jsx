import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import UserProvider from './contexts/UserContext';
import App from './App';
import store from './store';
import { setMessages, addMessage } from './features/messages';
import { ToastProvider } from './components/Toast';

export default ({ channels, messages }) => {
  store.dispatch(setMessages({ messages }));

  const socket = io();
  socket.on('newMessage', ({ data }) => {
    store.dispatch(addMessage({ message: data.attributes }));
  });

  render(
    <UserProvider>
      <ToastProvider>
        <Provider store={store}>
          <App channels={channels} />
        </Provider>
      </ToastProvider>
    </UserProvider>,
    document.getElementById('chat'),
  );
};
