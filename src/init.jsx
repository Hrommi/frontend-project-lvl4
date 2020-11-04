import React from 'react';
import { render } from 'react-dom';
import UserProvider from './contexts/UserContext';
import App from './App';
import { ToastProvider } from './components/Toast';

export default (channels) => {
  render(
    <UserProvider>
      <ToastProvider>
        <App channels={channels} />
      </ToastProvider>
    </UserProvider>,
    document.getElementById('chat'),
  );
};
