import { messagesReducer, addMessage } from './messagesSlice';
import { removeChannel } from '../channels';

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

describe('messagesReducer', () => {
  it('should handle initial state', () => {
    const state = messagesReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('should hanlde ADD_MESSAGE', () => {
    const state1 = messagesReducer(
      undefined,
      {
        type: addMessage.type,
        payload: {
          message: {
            ...message1,
          },
        },
      },
    );
    expect(state1).toEqual([message1]);

    const state2 = messagesReducer(
      [message1],
      {
        type: addMessage.type,
        payload: {
          message: {
            ...message2,
          },
        },
      },
    );
    expect(state2).toEqual([message1, message2]);
  });

  it('should handle REMOVE_CHANNEL', () => {
    const state = messagesReducer(
      messages,
      {
        type: removeChannel.type,
        payload: {
          channelId: channelId1,
        },
      },
    );
    expect(state).toEqual([message3]);
  });
});
