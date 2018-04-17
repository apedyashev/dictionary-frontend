// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Checkbox from 'components/ui/form/Checkbox';

export default function ReduxFormCheckboxField({
  input,
  label,
  defaultChecked,
  onChange,
  meta: {touched, error},
}) {
  return (
    <Checkbox
      {...input}
      label={label}
      defaultChecked={defaultChecked}
      onChange={(event, data) => {
        input.onChange(data.checked);
        if (onChange) {
          onChange(event, data);
        }
      }}
      error={(touched || '') && error}
    />
  );
}
ReduxFormCheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.string}),
  onChange: PropTypes.func,
};
