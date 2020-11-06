import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    setChannels(state, action) {
      return action.payload.channels;
    },
  },
});

export const { setChannels } = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;
