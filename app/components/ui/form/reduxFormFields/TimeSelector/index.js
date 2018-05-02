// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import TimeSelector from '../../TimeSelector';

export default function ReduxFormTimeSelectorField({input, label, meta: {touched, error}}) {
  return <TimeSelector {...input} label={label} error={(touched || '') && error} />;
}
ReduxFormTimeSelectorField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.string}),
};
ReduxFormTimeSelectorField.defaultProps = {
  label: '',
};
