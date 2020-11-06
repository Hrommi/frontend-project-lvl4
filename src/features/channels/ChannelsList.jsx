import React from 'react';

const renderChannel = (channel) => (
  <li className="nav-item mb-2" key={channel.id}>
    <button type="button" className="nav-link btn btn-light btn-block text-left">{channel.name}</button>
  </li>
);

const ChannelsList = ({ channels }) => {
  if (channels.length === 0) {
    return null;
  }

  return (
    <ul className="nav nav-pills flex-column">
      {channels.map(renderChannel)}
    </ul>
  );
};

export default ChannelsList;
