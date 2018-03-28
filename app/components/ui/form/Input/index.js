// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from '../material-design.css';

export default function Input({floatingLabel, hintText, value, error, onChange}) {
  return (
    <div className={cn('form-element form-input', {'has-error': !!error})}>
      <input
        className="form-element-field"
        placeholder={hintText}
        value={value}
        required
        onChange={onChange}
      />
      <div className="form-element-bar" />
      <label className="form-element-label">{floatingLabel}</label>
      <small className="form-element-hint">{error}</small>
    </div>
  );
}
Input.propTypes = {
  floatingLabel: PropTypes.string,
  hintText: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Input.defaultProps = {
  hintText: ' ',
};
