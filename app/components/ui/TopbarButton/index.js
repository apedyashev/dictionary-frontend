// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Menu} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function TopbarButton({
  children,
  as,
  active,
  className,
  position,
  onClick,
  omitSeparator,
  ...rest
}) {
  return (
    <Menu.Item
      as={as}
      active={active}
      className={cn(styles.root, className, {[styles.noSeparator]: omitSeparator})}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
}
TopbarButton.propTypes = {
  className: PropTypes.string,
  as: PropTypes.any,
  omitSeparator: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
TopbarButton.defaultProps = {
  as: 'div',
};
