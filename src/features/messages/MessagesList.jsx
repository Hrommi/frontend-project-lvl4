import React from 'react';
import { connect } from 'react-redux';
import { selectMessages } from './messagesSlice';

const renderMessage = (message) => (
  <div key={message.id}>
    <strong>
      {message.nickname}
    </strong>
    :
    {' '}
    {message.body}
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
      {messages.map(renderMessage)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: selectMessages(state),
});

export default connect(mapStateToProps)(MessagesList);
