import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import routes from '../../routes';
import Input from '../../components/Input';
import { closeModal as closeModalConnect } from '../../redux/slices/modal';
import Modal from '../../components/Modal';
import getSchema from './schema';
import selectChannelNames from './selectors';

const RenameChannel = ({ channel, channelNames, closeModal }) => {
  const { t } = useTranslation(['channels', 'form']);
  const { addToast, removeToast } = useToasts();
  const toastId = React.useRef(null);

  const nameInput = React.useRef(null);
  React.useEffect(() => {
    nameInput.current.select();
  }, []);

  return (
    <Modal
      title={t('rename')}
      onHide={closeModal}
    >
      <Formik
        initialValues={{ name: channel.name }}
        validationSchema={getSchema(channelNames)}
        validateOnBlur={false}
        onSubmit={async ({ name }) => {
          if (toastId.current) {
            removeToast(toastId.current);
          }
          const data = {
            attributes: {
              name: name.trim(),
            },
          };
          try {
            await axios.patch(routes.channelPath(channel.id), { data });
            closeModal();
          } catch (error) {
            toastId.current = addToast(error.message, { appearance: 'error' });
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Input
                name="name"
                ref={nameInput}
                readOnly={formik.isSubmitting}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => closeModal()}
                disabled={formik.isSubmitting}
              >
                {t('form:cancel')}
              </Button>
              <Button
                className="ml-2"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('form:submit')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  channel: state.channelsInfo.channels.find((channel) => (
    channel.id === state.modal.extra.channelId
  )),
  channelNames: selectChannelNames(state),
});

const mapDispatchToProps = {
  closeModal: closeModalConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameChannel);
