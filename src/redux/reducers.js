import { combineReducers } from '@reduxjs/toolkit';
import { channelsReducer } from '../features/channels';
import { messagesReducer } from '../features/messages';

export default combineReducers({
  channelsInfo: channelsReducer,
  messages: messagesReducer,
});
