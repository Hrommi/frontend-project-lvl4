import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import http from '../../api';
import routes from '../../routes';
import { useToast } from '../../components/Toast';

const RemoveChannel = ({ channel, cancelCallback }) => {
  const { t } = useTranslation(['channels', 'form']);
  const { showToast, hideToast } = useToast();

  const confirmButton = React.useRef(null);
  React.useEffect(() => {
    confirmButton.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      hideToast();

      try {
        await http.delete(routes.channelPath(channel.id));
        cancelCallback();
      } catch (error) {
        showToast({ title: t('form:error'), body: error.message });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <p>{t('areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          variant="secondary"
          onClick={cancelCallback}
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
  );
};

export default RemoveChannel;
