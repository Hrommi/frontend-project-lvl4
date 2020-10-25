import React from 'react';

const Channels = ({ channels }) => {
  const renderChannel = (channel) => (
    <li className="nav-item mb-2" key={channel.id}>
      <button type="button" className="nav-link btn btn-light btn-block text-left">{channel.name}</button>
    </li>
  );

  return (
    <div>
      <ul className="nav nav-pills flex-column">
        {channels.map(renderChannel)}
      </ul>
    </div>
  );
};

export default Channels;
