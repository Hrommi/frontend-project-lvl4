import { createSlice } from '@reduxjs/toolkit';
import { createSelectorCreator, defaultMemoize } from '@reduxjs/toolkit/node_modules/reselect';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages(state, action) {
      return action.payload.messages;
    },
    addMessage(state, action) {
      state.push(action.payload.message);
    },
  },
});

const CHANNEL_ID = 1;

const createLengthEqualSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => a.length === b.length,
);

const getMessages = (state) => state.messages.filter((message) => message.channelId === CHANNEL_ID);
const getCurrentChannelId = () => CHANNEL_ID;
export const selectMessagesByCurrentChannel = createLengthEqualSelector(
  [getMessages, getCurrentChannelId],
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

export const { setMessages, addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
