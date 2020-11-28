import selectMessages from './selectors';

const channelId1 = 1;
const channelId2 = 2;

const message1 = {
  id: 1,
  channelId: channelId1,
  nickname: 'Luciano.Cruickshank',
  body: 'first message',
};
const message2 = {
  id: 2,
  channelId: channelId1,
  nickname: 'Janis.Cronin',
  body: 'second message',
};
const message3 = {
  id: 3,
  channelId: channelId2,
  nickname: 'Luciano.Cruickshank',
  body: 'third message',
};
const messages = [
  message1,
  message2,
  message3,
];

describe('selectMessages', () => {
  beforeEach(() => {
    selectMessages.resetRecomputations();
  });

  it('should return messages with the correct channelId', () => {
    const state = { currentChannelId: channelId1, messages: [...messages] };
    expect(selectMessages(state)).toEqual([message1, message2]);
  });

  it('should be recomputation when adding a new message with the current currentChannelId', () => {
    const state1 = { currentChannelId: channelId1, messages: [] };
    expect(selectMessages(state1)).toHaveLength(0);
    expect(selectMessages.recomputations()).toBe(1);

    const state2 = { currentChannelId: channelId1, messages: [message1] };
    expect(selectMessages(state2)).toHaveLength(1);
    expect(selectMessages.recomputations()).toBe(2);
  });

  it('should not be recomputation when adding a new message with the other currentChannelId', () => {
    const state1 = { currentChannelId: channelId1, messages: [] };
    expect(selectMessages(state1)).toHaveLength(0);
    expect(selectMessages.recomputations()).toBe(1);

    const state2 = { currentChannelId: channelId1, messages: [message3] };
    expect(selectMessages(state2)).toHaveLength(0);
    expect(selectMessages.recomputations()).toBe(1);
  });
});
