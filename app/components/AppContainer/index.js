// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// other
import styles from './index.css';

export default function AppContainer({topbar, children}) {
  return (
    <div>
      {topbar}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
AppContainer.propTypes = {
  topbar: PropTypes.any,
  children: PropTypes.any,
};
