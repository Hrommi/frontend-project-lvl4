import React from 'react';
import Button from 'react-bootstrap/Button';
import ChannelsList from './ChannelsList';
import AddChannel from './AddChannel';
import { useModal } from '../../components/Modal';

const Channels = () => {
  const { showModal, hideModal } = useModal();

  return (
    <>
      <div className="d-flex align-items-center mb-2 pt-1">
        <span>Channels</span>
        <Button
          title="Add channel"
          type="button"
          className="ml-auto"
          variant="light"
          onClick={() => showModal({
            title: 'Add channel',
            body: <AddChannel cancelCallback={hideModal} />,
          })}
        >
          +
        </Button>
      </div>
      <ChannelsList />
    </>
  );
};

export default Channels;
