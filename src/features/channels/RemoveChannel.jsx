import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import http from '../../api';
import routes from '../../routes';
import { useToast } from '../../components/Toast';

const RemoveChannel = ({ channel, cancelCallback }) => {
  const { showToast, hideToast } = useToast();

  const confirmButton = React.useRef(null);
  const focusConfirmButton = () => {
    confirmButton.current.focus();
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      hideToast();

      try {
        await http.delete(routes.channelPath(channel.id));
        cancelCallback();
      } catch (error) {
        showToast({ title: 'Error', body: error.message });
      }
    },
  });

  React.useEffect(() => {
    focusConfirmButton();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <p>Are you sure?</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          variant="secondary"
          onClick={cancelCallback}
          disabled={formik.isSubmitting}
        >
          Cancel
        </Button>
        <Button
          className="ml-2"
          type="submit"
          variant="danger"
          disabled={formik.isSubmitting}
          ref={confirmButton}
        >
          Confirm
        </Button>
      </div>
    </Form>
  );
};

export default RemoveChannel;
