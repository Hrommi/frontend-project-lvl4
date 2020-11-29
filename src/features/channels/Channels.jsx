import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ChannelsList from './ChannelsList';
import AddChannel from './AddChannel';
import { useModal } from '../../components/Modal';

const Channels = () => {
  const { t } = useTranslation('channels');
  const { showModal, hideModal } = useModal({
    type: 'ADD_CHANNEL',
    title: t('add'),
    component: AddChannel,
  });

  return (
    <>
      <div className="d-flex align-items-center mb-2 pt-1">
        <span>{t('title')}</span>
        <Button
          title={t('add')}
          type="button"
          className="ml-auto"
          variant="light"
          onClick={() => showModal({ cancelCallback: hideModal })}
        >
          +
        </Button>
      </div>
      <ChannelsList />
    </>
  );
};

export default Channels;
