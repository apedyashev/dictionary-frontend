// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Input from 'components/ui/form/Input';

export default function ReduxFormInputField({
  input,
  autoFocus,
  autoComplete,
  disabled,
  label,
  hintText,
  type,
  meta: {touched, error},
}) {
  return (
    <Input
      {...input}
      disabled={disabled}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
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
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
};
ReduxFormInputField.defaultProps = {
  disabled: false,
  autoComplete: false,
  autoFocus: false,
};
