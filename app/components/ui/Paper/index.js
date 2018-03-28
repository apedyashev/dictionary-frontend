// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import styles from './index.css';

export default function Paper({children}) {
  return <div className={styles.root}>{children}</div>;
}
Paper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
