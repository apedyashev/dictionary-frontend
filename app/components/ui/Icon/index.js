// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Icon as IconSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Icon({name, hoverable, onClick}) {
  return <IconSUI name={name} className={cn({[styles.hoverable]: hoverable})} onClick={onClick} />;
}
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  hoverable: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};
