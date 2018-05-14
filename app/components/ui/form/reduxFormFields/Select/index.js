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
  loading,
  disabled,
  onChange,
  onSearchChange,
  meta: {touched, error},
}) {
  return (
    <Select
      {...input}
      disabled={disabled}
      loading={loading}
      options={options}
      floatingLabel={label}
      hintText={hintText}
      error={(touched || '') && error}
      onSearchChange={onSearchChange}
      onChange={(value) => {
        if (onChange) {
          onChange(value);
        }
        input.onChange(value);
      }}
    />
  );
}
ReduxFormSelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  hintText: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.string}),
  onSearchChange: PropTypes.func,
  onChange: PropTypes.func,
};
