// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Label as LabelSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Label({children, color, underlined}) {
  return (
    <LabelSUI color={color} className={cn({[styles.underlined]: underlined})}>
      {children}
    </LabelSUI>
  );
}
Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  underlined: PropTypes.bool,
};
