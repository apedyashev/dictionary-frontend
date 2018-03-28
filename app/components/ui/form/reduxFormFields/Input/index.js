// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Input} from 'components/ui';

export default function ReduxFormInputField({
  input,
  label,
  hintText,
  type,
  meta: {touched, error},
}) {
  return (
    <Input
      {...input}
      type={type}
      floatingLabel={label}
      hintText={hintText}
      error={(touched || '') && error}
    />
  );
}
ReduxFormInputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  hintText: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.string}),
};
