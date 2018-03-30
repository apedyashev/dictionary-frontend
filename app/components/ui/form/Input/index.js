// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
import _uniqueId from 'lodash/uniqueId';
// other
import '../material-design.css';

export default function Input({
  id,
  name,
  type,
  floatingLabel,
  hintText,
  value,
  error,
  autoComplete,
  onChange,
  onBlur,
  onFocus,
}) {
  const inputId = id || `input-${_uniqueId()}`;
  return (
    <div className={cn('form-element form-input', {'has-error': !!error})}>
      <input
        id={inputId}
        className={cn('form-element-field', {'form-element-has-value': !!value})}
        placeholder={hintText}
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <div className="form-element-bar" />
      <label className="form-element-label" htmlFor={inputId}>
        {floatingLabel}
      </label>
      <small className="form-element-hint">{error}</small>
    </div>
  );
}
Input.propTypes = {
  id: PropTypes.any,
  type: PropTypes.string,
  name: PropTypes.string,
  floatingLabel: PropTypes.string,
  hintText: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};
Input.defaultProps = {
  hintText: ' ',
  type: 'text',
};
