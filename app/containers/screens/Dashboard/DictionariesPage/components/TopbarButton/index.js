// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Menu} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function TopbarButton({children, className, position, onClick}) {
  return (
    <Menu.Item className={cn(styles.root, className)} onClick={onClick}>
      {children}
    </Menu.Item>
  );
}
TopbarButton.propTypes = {
  className: PropTypes.string,
};
