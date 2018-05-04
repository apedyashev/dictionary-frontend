// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Icon as IconSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Icon({name}) {
  return <IconSUI name={name} className={styles.hoverable} />;
}
Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
