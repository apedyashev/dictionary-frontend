// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Loader from '../Loader';
// other
import styles from './index.css';

export default function ListLoader({style, message}) {
  return (
    <div style={style} className={styles.root}>
      <Loader size={20} message={message} />
    </div>
  );
}
ListLoader.propTypes = {
  message: PropTypes.string,
  style: PropTypes.object,
};
ListLoader.defaultProps = {
  message: 'Please wait',
};
