import { combineReducers } from '@reduxjs/toolkit';
import { messagesReducer } from '../features/messages';

export default combineReducers({
  messages: messagesReducer,
});
