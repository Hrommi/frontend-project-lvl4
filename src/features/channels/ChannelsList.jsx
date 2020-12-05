import React from 'react';
import { connect } from 'react-redux';
import ChannelItem from './ChannelItem';
import { setCurrentChannelId as setCurrentChannelIdConnect } from './channelsInfoSlice';

const ChannelsList = ({ channels, currentChannelId, setCurrentChannelId }) => {
  if (channels.length === 0) {
    return null;
  }

  return (
    <ul className="nav nav-pills flex-column">
      {channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          isCurrent={channel.id === currentChannelId}
          setCurrentChannelId={setCurrentChannelId}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentChannelId: state.channelsInfo.currentChannelId,
});

const mapDispatchToProps = {
  setCurrentChannelId: setCurrentChannelIdConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
