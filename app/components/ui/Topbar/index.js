// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Menu} from 'semantic-ui-react';
import TopbarButton from '../TopbarButton';
// other
import styles from './index.css';

export default function Topbar({children, title, as, ...rest}) {
  return (
    <Menu as={as} className={styles.root} {...rest}>
      {children}
      {title && (
        <TopbarButton className={styles.title} omitSeparator>
          {title}
        </TopbarButton>
      )}
    </Menu>
  );
}
Topbar.propTypes = {
  children: PropTypes.any,
  as: PropTypes.any,
};
Topbar.defaultProps = {as: 'div'};
