// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from './index.css';

export default function H2({children, className}) {
  return <h2 className={cn(styles.root, className)}>{children}</h2>;
}
H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
H2.defaultProps = {
  className: '',
};
