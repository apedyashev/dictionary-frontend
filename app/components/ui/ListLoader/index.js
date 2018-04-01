// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Loader from '../Loader';
// other
import styles from './index.css';

export default function ListLoader() {
  return (
    <div className={styles.root}>
      <Loader size={20} message="Please wait" />
    </div>
  );
}
ListLoader.propTypes = {};
