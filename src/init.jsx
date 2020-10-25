import React from 'react';
import { render } from 'react-dom';
import App from './App';

export default (channels) => {
  render(
    <App channels={channels} />,
    document.getElementById('chat'),
  );
};
