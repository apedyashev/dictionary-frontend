// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import { Container, Image, Menu, Button, Dropdown } from 'semantic-ui-react'
// other
import styles from './index.css';

export default function NavLanguageSelector({languages}) {
  return (
    <Button basic className={styles.dropdownWrappingBtn}>
      <Dropdown className={styles.dropdown} placeholder='English' options={languages} simple item />
    </Button>
  );
}
NavLanguageSelector.propTypes = {};
