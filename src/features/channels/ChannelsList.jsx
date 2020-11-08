import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import { setCurrentChannelId as setCurrentChannelIdConnect } from './currentChannelIdSlice';
import { useModal } from '../../components/Modal';

const renderChannel = ({
  channel,
  currentChannelId,
  setCurrentChannelId,
  showModal,
  hideModal,
}) => {
  const buttonClasses = cn('nav-link text-left', {
    'flex-grow-1': channel.removable,
  });
  const buttonVariant = currentChannelId === channel.id ? 'primary' : 'light';

  const renderButton = () => (
    <Button
      className={buttonClasses}
      block
      type="button"
      variant={buttonVariant}
      onClick={() => setCurrentChannelId({ channelId: channel.id })}
    >
      {channel.name}
    </Button>
  );

  return (
    <li className="nav-item mb-2" key={channel.id}>
      {channel.removable ? (
        <Dropdown className="d-flex" as={ButtonGroup}>
          {renderButton()}
          <Dropdown.Toggle split variant={buttonVariant} />
          <Dropdown.Menu alignRight>
            <Dropdown.Item
              onClick={() => showModal({
                title: 'Rename channel',
                body: <RenameChannel channel={channel} cancelCallback={hideModal} />,
              })}
            >
              Rename
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => showModal({
                title: 'Remove channel',
                body: <RemoveChannel channel={channel} cancelCallback={hideModal} />,
              })}
            >
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : renderButton()}
    </li>
  );
};

const ChannelsList = ({ channels, currentChannelId, setCurrentChannelId }) => {
  const { showModal, hideModal } = useModal();

  if (channels.length === 0) {
    return null;
  }

  return (
    <ul className="nav nav-pills flex-column">
      {channels.map((channel) => renderChannel({
        channel,
        currentChannelId,
        setCurrentChannelId,
        showModal,
        hideModal,
      }))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = {
  setCurrentChannelId: setCurrentChannelIdConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList);
