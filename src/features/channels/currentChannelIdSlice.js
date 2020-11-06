import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload.channelId;
    },
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;

export const currentChannelIdReducer = currentChannelIdSlice.reducer;
