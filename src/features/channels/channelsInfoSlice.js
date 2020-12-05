import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, action) {
      state.channels.push(action.payload.channel);
    },
    removeChannel(state, action) {
      const channels = state.channels.filter(
        (channel) => channel.id !== action.payload.channelId,
      );
      return {
        ...state,
        channels,
      };
    },
    renameChannel(state, action) {
      const currentChannel = state.channels.find(
        (channel) => channel.id === action.payload.channelId,
      );
      if (currentChannel) {
        currentChannel.name = action.payload.channelName;
      }
    },
    setCurrentChannelId(state, action) {
      return {
        ...state,
        currentChannelId: action.payload.channelId,
      };
    },
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;
