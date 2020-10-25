import React from 'react';
import { render } from 'react-dom';
import UserProvider from './contexts/UserContext';
import App from './App';

export default (channels) => {
  render(
    <UserProvider>
      <App channels={channels} />
    </UserProvider>,
    document.getElementById('chat'),
  );
};
