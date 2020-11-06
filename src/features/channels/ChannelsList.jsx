import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { setCurrentChannelId as setCurrentChannelIdConnect } from './currentChannelIdSlice';

const renderChannel = ({ channel, currentChannelId, setCurrentChannelId }) => {
  const buttonClasses = cn('nav-link btn btn-block text-left', {
    'btn-primary': currentChannelId === channel.id,
    'btn-light': currentChannelId !== channel.id,
  });

  return (
    <li className="nav-item mb-2" key={channel.id}>
      <button
        type="button"
        className={buttonClasses}
        onClick={() => setCurrentChannelId({ channelId: channel.id })}
      >
        {channel.name}
      </button>
    </li>
  );
};

const ChannelsList = ({ channels, currentChannelId, setCurrentChannelId }) => {
  if (channels.length === 0) {
    return null;
  }

  return (
    <ul className="nav nav-pills flex-column">
      {channels.map((channel) => renderChannel({ channel, currentChannelId, setCurrentChannelId }))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = {
  setCurrentChannelId: setCurrentChannelIdConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
