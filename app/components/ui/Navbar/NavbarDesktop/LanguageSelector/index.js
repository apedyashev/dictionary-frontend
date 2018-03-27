// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Image, Menu, Button, Dropdown, Flag} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function NavLanguageSelector({value, languages, onChange}) {
  const handleChange = (e, data) => onChange(data.value);
  return (
    <Button basic className={styles.dropdownWrappingBtn}>
      <Dropdown
        icon="world"
        className={styles.dropdown}
        value={value}
        options={languages}
        simple
        item
        onChange={handleChange}
      />
    </Button>
  );
}
NavLanguageSelector.propTypes = {};
NavLanguageSelector.defaultProps = {
  value: 'en',
};
