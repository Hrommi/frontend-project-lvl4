import { currentChannelIdReducer, setCurrentChannelId } from './currentChannelIdSlice';

describe('currentChannelIdReducer', () => {
  it('should handle initial state', () => {
    const state = currentChannelIdReducer(undefined, {});
    expect(state).toBeNull();
  });

  it('should hanlde SET_CURRENT_CHANNEL_ID', () => {
    const newChannelId = 1;
    const state = currentChannelIdReducer(
      undefined,
      {
        type: setCurrentChannelId.type,
        payload: {
          channelId: newChannelId,
        },
      },
    );
    expect(state).toBe(newChannelId);
  });
});
