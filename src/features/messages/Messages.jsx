import React from 'react';
import MessagesList from './MessagesList';
import AddMessage from './AddMessage';

const Messages = () => (
  <div className="d-flex flex-column h-100">
    <MessagesList />
    <div className="mt-auto">
      <AddMessage />
    </div>
  </div>
);

export default Messages;
