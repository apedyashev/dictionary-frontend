// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
// other
import styles from './index.css';

export default function WhiteBoard({children}) {
  return <div className={styles.root}>{children}</div>;
}
WhiteBoard.propTypes = {
  children: PropTypes.any,
};
