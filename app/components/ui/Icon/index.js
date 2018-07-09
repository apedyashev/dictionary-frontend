// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Icon as IconSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Icon({name, loading, hoverable, disabled, className, onClick}) {
  return (
    <IconSUI
      name={name}
      disabled={disabled}
      loading={loading}
      className={cn(className, {[styles.hoverable]: hoverable})}
      onClick={onClick}
    />
  );
}
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
