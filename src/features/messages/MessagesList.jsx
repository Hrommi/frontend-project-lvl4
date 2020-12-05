import React from 'react';
import { connect } from 'react-redux';
import selectMessages from './selectors';

const Message = ({ nickname, body }) => (
  <div className="text-break">
    <strong>
      {nickname}
    </strong>
    :
    {' '}
    {body}
  </div>
);

const MessagesList = ({ messages }) => {
  const container = React.useRef(null);

  const scrollToBottom = () => {
    const { current } = container;
    current.scrollTo(0, current.scrollHeight - current.offsetHeight);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="overflow-auto mb-3"
      ref={container}
    >
      {messages.map(({ id, nickname, body }) => (
        <Message key={id} nickname={nickname} body={body} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(MessagesList);
