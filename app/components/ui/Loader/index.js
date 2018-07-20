import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './index.css';

// https://github.com/gilbarbara/react-redux-saga-boilerplate/blob/master/app/scripts/components/Loader.jsx
const Loader = ({message, className, size}) => {
  return (
    <div className={className}>
      <div
        className={cn(styles.loader, styles['loader--pulse'])}
        style={{width: size, height: size}}
      >
        <div />
      </div>
      {message && <span className={styles.label}>{message}</span>}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  message: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  size: 30,
};

export default Loader;
