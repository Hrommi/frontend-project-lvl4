import { combineReducers } from '@reduxjs/toolkit';
import { channelsReducer, currentChannelIdReducer } from '../features/channels';
import { messagesReducer } from '../features/messages';

export default combineReducers({
  channels: channelsReducer,
  currentChannelId: currentChannelIdReducer,
  messages: messagesReducer,
});
