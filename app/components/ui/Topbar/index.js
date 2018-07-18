// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Menu} from 'semantic-ui-react';
import TopbarTitle from '../TopbarTitle';
// other
import styles from './index.css';

export default function Topbar({children, title, as, className, ...rest}) {
  return (
    <Menu as={as} className={cn(styles.root, className)} {...rest}>
      {children}
      {title && <TopbarTitle title={title} />}
    </Menu>
  );
}
Topbar.propTypes = {
  children: PropTypes.any,
  as: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
};
Topbar.defaultProps = {as: 'div'};
