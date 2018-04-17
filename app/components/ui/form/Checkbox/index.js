// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Checkbox as CheckboxSUI} from 'semantic-ui-react';

export default function Checkbox({label, checked, onChange}) {
  return <CheckboxSUI label={label} checked={checked} onChange={onChange} />;
}
Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
