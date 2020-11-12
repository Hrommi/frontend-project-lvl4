import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import http from '../../api';
import routes from '../../routes';
import { useToast } from '../../components/Toast';
import getSchema from './schema';
import { selectChannelNames } from './channelsSlice';

const AddChannel = ({ cancelCallback, channelNames }) => {
  const { showToast, hideToast } = useToast();

  const nameInput = React.useRef(null);
  const focusNameInput = () => {
    nameInput.current.focus();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getSchema(channelNames),
    onSubmit: async ({ name }, { resetForm }) => {
      hideToast();

      const data = {
        attributes: {
          name: name.trim(),
        },
      };
      try {
        await http.post(routes.channelsPath(), { data });
        resetForm();
        cancelCallback();
      } catch (error) {
        showToast({ title: 'Error', body: error.message });
      }
    },
  });

  React.useEffect(() => {
    focusNameInput();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          ref={nameInput}
          readOnly={formik.isSubmitting}
          isInvalid={formik.errors.name && formik.touched.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
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
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  channelNames: selectChannelNames(state),
});

export default connect(mapStateToProps)(AddChannel);
