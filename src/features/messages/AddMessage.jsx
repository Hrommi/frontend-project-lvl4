import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import routes from '../../routes';
import { useUser } from '../../contexts/UserContext';
import Input from '../../components/Input';

const AddMessage = ({ currentChannelId }) => {
  const { t } = useTranslation('form');
  const { nickname } = useUser();
  const { addToast, removeToast } = useToasts();
  const toastId = React.useRef(null);

  const bodyInput = React.useRef(null);
  const focusBodyInput = () => {
    bodyInput.current.focus();
  };

  React.useEffect(() => {
    focusBodyInput();
  }, []);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async ({ body }, { resetForm }) => {
        if (toastId.current) {
          removeToast(toastId.current);
        }
        const trimmedBody = body.trim();
        if (trimmedBody === '') {
          return;
        }
        const data = {
          attributes: {
            body: trimmedBody,
            nickname,
          },
        };
        try {
          await axios.post(routes.channelMessagesPath(currentChannelId), { data });
          resetForm();
          focusBodyInput();
        } catch (error) {
          toastId.current = addToast(error.message, { appearance: 'error' });
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Col>
              <Input
                name="body"
                ref={bodyInput}
                readOnly={formik.isSubmitting}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" disabled={formik.isSubmitting}>
                {t('submit')}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  currentChannelId: state.channelsInfo.currentChannelId,
});

export default connect(mapStateToProps)(AddMessage);
