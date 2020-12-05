import selectChannelNames from './selectors';

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

describe('selectChannelNames', () => {
  beforeEach(() => {
    selectChannelNames.resetRecomputations();
  });

  it('should return channels names', () => {
    const state = { channelsInfo: { channels: [...channels] } };
    expect(selectChannelNames(state)).toEqual(['first channel', 'second channel']);
  });
});
