import React from 'react';
import { useField } from 'formik';
import FormControl from 'react-bootstrap/FormControl';

const Input = React.forwardRef((props, ref) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <>
      <FormControl
        ref={ref}
        isInvalid={hasError}
        /* eslint-disable react/jsx-props-no-spreading */
        {...field}
        {...props}
        /* eslint-enable */
      />
      {hasError && (
        <FormControl.Feedback type="invalid">
          {meta.error}
        </FormControl.Feedback>
      )}
    </>
  );
});

export default Input;
