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
  languages: [
    {key: 1, text: 'English', value: 'en', flag: 'us'},
    {key: 2, text: 'Deutsch', value: 'de', flag: 'ch'},
    {key: 3, text: 'Српски', value: 'sr', flag: 'rs'},
    {key: 4, text: 'Русский', value: 'ru', flag: 'ru'},
  ],
};
