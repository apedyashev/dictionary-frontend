// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import styles from './index.css';

export default function WordItem({data, style}) {
  return (
    <div className={styles.row} style={style}>
      <div className={styles.checkbox}>x</div>
      <div className={styles.text}>{data.word}</div>
    </div>
  );
}
WordItem.propTypes = {};
