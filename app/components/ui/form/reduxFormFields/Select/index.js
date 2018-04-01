// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Select from 'components/ui/form/Select';

export default function ReduxFormSelectField({
  input,
  label,
  hintText,
  options,
  meta: {touched, error},
}) {
  console.log('touched, error', touched, error);
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
ReduxFormSelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  hintText: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.string}),
};
