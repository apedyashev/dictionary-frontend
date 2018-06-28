// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
// other
import styles from './index.css';

export default function WhiteBoard({children, className}) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}
WhiteBoard.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
