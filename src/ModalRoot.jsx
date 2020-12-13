import React from 'react';
import { connect } from 'react-redux';
import {
  AddChannel,
  RenameChannel,
  RemoveChannel,
  ADD_CHANNEL,
  RENAME_CHANNEL,
  REMOVE_CHANNEL,
} from './features/channels';

const modals = {
  [ADD_CHANNEL]: AddChannel,
  [RENAME_CHANNEL]: RenameChannel,
  [REMOVE_CHANNEL]: RemoveChannel,
};

const getModal = (type) => modals[type];

const ModalContainer = ({ isOpened, type }) => {
  if (!isOpened) {
    return null;
  }

  const Component = getModal(type);
  return <Component />;
};

const mapStateToProps = (state) => ({
  isOpened: state.modal.isOpened,
  type: state.modal.type,
});

export default connect(mapStateToProps)(ModalContainer);
