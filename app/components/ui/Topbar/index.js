// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Menu} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Topbar({children}) {
  return <Menu className={styles.root}>{children}</Menu>;
}
Topbar.propTypes = {
  children: PropTypes.any,
};
