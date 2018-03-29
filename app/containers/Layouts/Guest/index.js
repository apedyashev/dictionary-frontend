// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Navbar from './components/Navbar';
// other
import styles from './index.css';

export default function GuestLayout({children}) {
  return (
    <div className={styles.root}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
GuestLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
