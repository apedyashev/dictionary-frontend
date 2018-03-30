// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Select from 'components/ui/form/Select';

export default function ReduxFormInputField({
  input,
  label,
  hintText,
  options,
  meta: {touched, error},
}) {
  return (
    <Select
      {...input}
      options={options}
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
