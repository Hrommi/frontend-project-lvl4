import {
  channelsReducer,
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
} from './channelsInfoSlice';

const channelId1 = 1;
const channelId2 = 2;

const channel1 = {
  id: channelId1,
  name: 'first channel',
};
const channel2 = {
  id: channelId2,
  name: 'second channel',
};
const channels = [
  channel1,
  channel2,
];

describe('channelsReducer', () => {
  it('should handle initial state', () => {
    const state = channelsReducer(undefined, {});
    const expected = {
      channels: [],
      currentChannelId: null,
    };
    expect(state).toEqual(expected);
  });

  it('should hanlde ADD_CHANNEL', () => {
    const state1 = channelsReducer(
      undefined,
      {
        type: addChannel.type,
        payload: {
          channel: {
            ...channel1,
          },
        },
      },
    );
    const expected1 = {
      channels: [channel1],
      currentChannelId: null,
    };
    expect(state1).toEqual(expected1);

    const state2 = channelsReducer(
      {
        channels: [channel1],
        currentChannelId: null,
      },
      {
        type: addChannel.type,
        payload: {
          channel: {
            ...channel2,
          },
        },
      },
    );
    const expected2 = {
      channels: [channel1, channel2],
      currentChannelId: null,
    };
    expect(state2).toEqual(expected2);
  });

  it('should handle REMOVE_CHANNEL', () => {
    const state = channelsReducer(
      {
        channels,
        currentChannelId: channelId1,
      },
      {
        type: removeChannel.type,
        payload: {
          channelId: channelId1,
        },
      },
    );
    const expected = {
      channels: [channel2],
      currentChannelId: channelId2,
    };
    expect(state).toEqual(expected);
  });

  it('should handle RENAME_CHANNEL', () => {
    const newName = 'new channel';
    const state = channelsReducer(
      {
        channels,
        currentChannelId: null,
      },
      {
        type: renameChannel.type,
        payload: {
          channelId: channelId1,
          channelName: newName,
        },
      },
    );
    const expected = {
      channels: [{ id: channelId1, name: newName }, channel2],
      currentChannelId: null,
    };
    expect(state).toEqual(expected);
  });

  it('should hanlde SET_CURRENT_CHANNEL_ID', () => {
    const newChannelId = 1;
    const state = channelsReducer(
      {
        channels,
        currentChannelId: null,
      },
      {
        type: setCurrentChannelId.type,
        payload: {
          channelId: newChannelId,
        },
      },
    );
    const expected = {
      channels,
      currentChannelId: newChannelId,
    };
    expect(state).toEqual(expected);
  });
});
