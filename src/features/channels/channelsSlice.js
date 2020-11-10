import { createSelector, createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      state.push(action.payload.channel);
    },
    removeChannel(state, action) {
      return state.filter((channel) => channel.id !== action.payload.channelId);
    },
    renameChannel(state, action) {
      const currentChannel = state.find((channel) => channel.id === action.payload.channelId);
      if (currentChannel) {
        currentChannel.name = action.payload.channelName;
      }
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

const getChannels = (state) => state.channels;
export const selectChannelNames = createSelector(
  [getChannels],
  (channels) => channels.map((channel) => channel.name),
);

export const channelsReducer = channelsSlice.reducer;
