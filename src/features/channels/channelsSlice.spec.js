import {
  channelsReducer,
  addChannel,
  removeChannel,
  renameChannel,
  selectChannelNames,
} from './channelsSlice';

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
    expect(state).toEqual([]);
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
    expect(state1).toEqual([channel1]);

    const state2 = channelsReducer(
      [channel1],
      {
        type: addChannel.type,
        payload: {
          channel: {
            ...channel2,
          },
        },
      },
    );
    expect(state2).toEqual([channel1, channel2]);
  });

  it('should handle REMOVE_CHANNEL', () => {
    const state = channelsReducer(
      channels,
      {
        type: removeChannel.type,
        payload: {
          channelId: channelId1,
        },
      },
    );
    expect(state).toEqual([channel2]);
  });

  it('should handle RENAME_CHANNEL', () => {
    const newName = 'new channel';
    const state = channelsReducer(
      channels,
      {
        type: renameChannel.type,
        payload: {
          channelId: channelId1,
          channelName: newName,
        },
      },
    );
    expect(state).toEqual([{ id: channelId1, name: newName }, channel2]);
  });
});

describe('selectChannelNames', () => {
  beforeEach(() => {
    selectChannelNames.resetRecomputations();
  });

  it('should return channels with the correct channelId', () => {
    const state = { channels: [...channels] };
    expect(selectChannelNames(state)).toEqual(['first channel', 'second channel']);
  });
});
