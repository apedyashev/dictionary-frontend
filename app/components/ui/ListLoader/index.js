// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Loader from '../Loader';
// other
import styles from './index.css';

export default function ListLoader({message}) {
  return (
    <div className={styles.root}>
      <Loader size={20} message={message} />
    </div>
  );
}
ListLoader.propTypes = {
  message: PropTypes.string,
};
ListLoader.defaultProps = {
  message: 'Please wait',
};
