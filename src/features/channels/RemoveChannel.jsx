import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import routes from '../../routes';
import { closeModal as closeModalConnect } from '../../redux/slices/modal';
import Modal from '../../components/Modal';

const RemoveChannel = ({ channelId, closeModal }) => {
  const { t } = useTranslation(['channels', 'form']);
  const { addToast, removeToast } = useToasts();
  const toastId = React.useRef(null);

  const confirmButton = React.useRef(null);
  React.useEffect(() => {
    confirmButton.current.focus();
  }, []);

  return (
    <Modal
      title={t('remove')}
      onHide={closeModal}
    >
      <Formik
        initialValues={{}}
        onSubmit={async () => {
          if (toastId.current) {
            removeToast(toastId.current);
          }
          try {
            await axios.delete(routes.channelPath(channelId));
            closeModal();
          } catch (error) {
            toastId.current = addToast(error.message, { appearance: 'error' });
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <p>{t('areYouSure')}</p>
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
                variant="danger"
                disabled={formik.isSubmitting}
                ref={confirmButton}
              >
                {t('form:confirm')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  channelId: state.modal.extra.channelId,
});

const mapDispatchToProps = {
  closeModal: closeModalConnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveChannel);
