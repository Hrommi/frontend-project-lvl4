import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload.message);
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => (
      state.filter((message) => message.channelId !== action.payload.channelId)
    ),
  },
});

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
