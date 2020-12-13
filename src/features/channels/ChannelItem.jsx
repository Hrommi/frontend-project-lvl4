import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { RENAME_CHANNEL, REMOVE_CHANNEL } from './modalTypes';

const ChannelButton = ({ channel, setCurrentChannelId, buttonVariant }) => {
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

const ChannelItem = ({
  channel,
  isCurrent,
  setCurrentChannelId,
  openModal,
}) => {
  const { t } = useTranslation('channels');

  const buttonVariant = isCurrent ? 'primary' : 'light';

  return (
    <li className="nav-item mb-2">
      {channel.removable ? (
        <Dropdown className="d-flex" as={ButtonGroup}>
          <ChannelButton
            channel={channel}
            setCurrentChannelId={setCurrentChannelId}
            buttonVariant={buttonVariant}
          />
          <Dropdown.Toggle split variant={buttonVariant} />
          <Dropdown.Menu alignRight>
            <Dropdown.Item
              onClick={() => openModal({ type: RENAME_CHANNEL, extra: { channelId: channel.id } })}
            >
              {t('renameAction')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openModal({ type: REMOVE_CHANNEL, extra: { channelId: channel.id } })}
            >
              {t('removeAction')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <ChannelButton
          channel={channel}
          setCurrentChannelId={setCurrentChannelId}
          buttonVariant={buttonVariant}
        />
      )}
    </li>
  );
};

export default ChannelItem;
