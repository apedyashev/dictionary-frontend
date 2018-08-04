// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from './index.css';

export default function H3({children, className}) {
  return <h3 className={cn(styles.root, className)}>{children}</h3>;
}
H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
H3.defaultProps = {
  className: '',
};
