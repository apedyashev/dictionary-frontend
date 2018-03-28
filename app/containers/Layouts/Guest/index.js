// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Navheader from 'components/ui/Navbar';
// other
import styles from './index.css';

export default function GuestLayout({children}) {
  return (
    <div className={styles.root}>
      <Navheader />
      <div>{children}</div>
    </div>
  );
}
GuestLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
