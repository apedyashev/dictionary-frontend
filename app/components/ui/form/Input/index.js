// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
import _uniqueId from 'lodash/uniqueId';
// other
import '../material-design.css';

class Input extends React.PureComponent {
  static propTypes = {
    id: PropTypes.any,
    type: PropTypes.string,
    name: PropTypes.string,
    floatingLabel: PropTypes.string,
    hintText: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    autoComplete: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  };
  static defaultProps = {
    hintText: '',
    type: 'text',
    disabled: false,
  };
  inputRef = React.createRef();

  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const {
      id,
      name,
      type,
      floatingLabel,
      hintText,
      value,
      error,
      autoComplete,
      disabled,
      onChange,
      onBlur,
      onFocus,
    } = this.props;
    const inputId = id || `input-${_uniqueId()}`;
    return (
      <div className={cn('form-element form-input', {'has-error': !!error})}>
        <input
          id={inputId}
          ref={this.inputRef}
          className={cn('form-element-field', {'form-element-has-value': !!value})}
          placeholder={hintText}
          type={type}
          name={name}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
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
}

export default Input;
