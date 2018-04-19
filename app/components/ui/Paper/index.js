// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import styles from './index.css';

export default function Paper({children, className}) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
Paper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
};
