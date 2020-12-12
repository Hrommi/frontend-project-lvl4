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
import getSchema from './schema';
import selectChannelNames from './selectors';

const RenameChannel = ({ channel, cancelCallback, channelNames }) => {
  const { t } = useTranslation('form');
  const { addToast, removeToast } = useToasts();
  const toastId = React.useRef(null);

  const nameInput = React.useRef(null);
  React.useEffect(() => {
    nameInput.current.select();
  }, []);

  return (
    <Formik
      initialValues={{ name: channel.name }}
      validationSchema={getSchema(channelNames)}
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
          cancelCallback();
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
              onClick={cancelCallback}
              disabled={formik.isSubmitting}
            >
              {t('cancel')}
            </Button>
            <Button
              className="ml-2"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  channelNames: selectChannelNames(state),
});

export default connect(mapStateToProps)(RenameChannel);
