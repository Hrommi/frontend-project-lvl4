import { createSlice } from '@reduxjs/toolkit';

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

export const channelsReducer = channelsSlice.reducer;
