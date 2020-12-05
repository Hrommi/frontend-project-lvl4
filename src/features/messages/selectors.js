import last from 'lodash/last';
import isEqual from 'lodash/isEqual';
import { createSelector } from '@reduxjs/toolkit';
import { createSelectorCreator, defaultMemoize } from '@reduxjs/toolkit/node_modules/reselect';

const createLastItemEqualSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => isEqual(last(a), last(b)),
);

const getCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
const getMessages = (state) => state.messages;
const selectMessagesByCurrentChannelId = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);
const selectMessages = createLastItemEqualSelector(
  [selectMessagesByCurrentChannelId],
  (messages) => messages,
);

export default selectMessages;
