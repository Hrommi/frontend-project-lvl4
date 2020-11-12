import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import http from '../../api';
import routes from '../../routes';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../components/Toast';

const AddMessage = ({ currentChannelId }) => {
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
        await http.post(routes.channelMessagesPath(currentChannelId), { data });
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
            readOnly={formik.isSubmitting}
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

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

export default connect(mapStateToProps)(AddMessage);
