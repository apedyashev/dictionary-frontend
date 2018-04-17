// libs
import React from 'react';
// components
import Loader from '../Loader';
// other
import styles from './index.css';

export default function PageLoader() {
  return (
    <div className={styles.root}>
      <Loader message="Please wait" />
    </div>
  );
}
PageLoader.propTypes = {};
