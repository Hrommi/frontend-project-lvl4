import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useModal } from '../../components/Modal';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const renderButton = ({ channel, setCurrentChannelId, buttonVariant }) => {
  const buttonClasses = cn('nav-link text-left', {
    'flex-grow-1': channel.removable,
  });
  return (
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
};

const ChannelItem = ({ channel, isCurrent, setCurrentChannelId }) => {
  const { t } = useTranslation('channels');
  const { showModal, hideModal } = useModal();

  const buttonVariant = isCurrent ? 'primary' : 'light';

  return (
    <li className="nav-item mb-2">
      {channel.removable ? (
        <Dropdown className="d-flex" as={ButtonGroup}>
          {renderButton({ channel, setCurrentChannelId, buttonVariant })}
          <Dropdown.Toggle split variant={buttonVariant} />
          <Dropdown.Menu alignRight>
            <Dropdown.Item
              onClick={() => showModal({
                title: t('rename'),
                body: <RenameChannel channel={channel} cancelCallback={hideModal} />,
              })}
            >
              {t('renameAction')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => showModal({
                title: t('remove'),
                body: <RemoveChannel channel={channel} cancelCallback={hideModal} />,
              })}
            >
              {t('removeAction')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : renderButton({ channel, setCurrentChannelId, buttonVariant })}
    </li>
  );
};

export default ChannelItem;
