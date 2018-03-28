// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// other
import styles from './index.css';

export default function GuestLayout({children}) {
  return <div className={styles.root}>{children}</div>;
}
GuestLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
