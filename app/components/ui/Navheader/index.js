// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button} from 'semantic-ui-react';
import {Responsive} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Navheader() {
  return (
    <div className={styles.root}>
      <Button>Click Here</Button>
    </div>
  );
}
Navheader.propTypes = {};
