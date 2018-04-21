// libs
import React from 'react';
import PropTypes from 'prop-types';
// components
import Loader from '../Loader';
// other
import styles from './index.css';

export default function PageLoader({message}) {
  return (
    <div className={styles.root}>
      <Loader message={message} />
    </div>
  );
}
PageLoader.propTypes = {
  message: PropTypes.string,
};
PageLoader.defaultProps = {
  message: 'Please wait',
};
