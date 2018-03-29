// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar} from './components';
// other
import styles from './index.css';

export default function DashboardLayout({children}) {
  return (
    <div className={styles.root}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
