import { combineReducers } from '@reduxjs/toolkit';
import { channelsReducer } from '../features/channels';
import { messagesReducer } from '../features/messages';
import modalReducer from './slices/modal';

export default combineReducers({
  channelsInfo: channelsReducer,
  messages: messagesReducer,
  modal: modalReducer,
});
