import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import routes from '../../routes';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../components/Toast';

const CHANNEL_ID = 1;

const AddMessage = () => {
  const { nickname } = useUser();
  const { showToast, hideToast } = useToast();

  const bodyInput = React.useRef(null);
  const focusBodyInput = () => {
    bodyInput.current.focus();
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm }) => {
      hideToast();

      if (body.trim() === '') {
        return;
      }

      const data = {
        data: {
          attributes: {
            body,
            nickname,
          },
        },
      };
      try {
        await axios.post(routes.channelMessagesPath(CHANNEL_ID), data);
        resetForm();
        focusBodyInput();
      } catch (error) {
        showToast({ title: 'Error', body: error.message });
      }
    },
  });

  React.useEffect(() => {
    focusBodyInput();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={bodyInput}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default AddMessage;
