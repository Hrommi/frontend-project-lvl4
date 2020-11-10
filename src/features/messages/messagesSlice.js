import last from 'lodash/last';
import isEqual from 'lodash/isEqual';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createSelectorCreator, defaultMemoize } from '@reduxjs/toolkit/node_modules/reselect';
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

const createLastItemEqualSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => isEqual(last(a), last(b)),
);

const getCurrentChannelId = (state) => state.currentChannelId;
const getMessages = (state) => state.messages;
const selectMessagesByCurrentChannelId = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);
export const selectMessages = createLastItemEqualSelector(
  [selectMessagesByCurrentChannelId],
  (messages) => messages,
);

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
