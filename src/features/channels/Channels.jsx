import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { openModal as openModalConnect } from '../../redux/slices/modal';
import { ADD_CHANNEL } from './modalTypes';
import ChannelsList from './ChannelsList';

const Channels = ({ openModal }) => {
  const { t } = useTranslation('channels');

  return (
    <>
      <div className="d-flex align-items-center mb-2 pt-1">
        <span>{t('title')}</span>
        <Button
          title={t('add')}
          type="button"
          className="ml-auto"
          variant="light"
          onClick={() => openModal({ type: ADD_CHANNEL })}
        >
          +
        </Button>
      </div>
      <ChannelsList />
    </>
  );
};

const mapDispatchToProps = {
  openModal: openModalConnect,
};

export default connect(null, mapDispatchToProps)(Channels);
