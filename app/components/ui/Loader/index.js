import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './index.css';

// https://github.com/gilbarbara/react-redux-saga-boilerplate/blob/master/app/scripts/components/Loader.jsx
const Loader = ({message, size}) => {
  return (
    <div>
      <div
        className={cn(styles.loader, styles['loader--pulse'])}
        style={{width: size, height: size}}
      >
        <div />
      </div>
      <span className={styles.label}>{message}</span>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number.isRequired,
};

Loader.defaultProps = {
  size: 30,
};

export default Loader;
