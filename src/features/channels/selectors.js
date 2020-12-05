import { createSelector } from '@reduxjs/toolkit';

const getChannels = (state) => state.channelsInfo.channels;
const selectChannelNames = createSelector(
  [getChannels],
  (channels) => channels.map((channel) => channel.name),
);

export default selectChannelNames;
