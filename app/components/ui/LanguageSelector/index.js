// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button, Dropdown} from 'semantic-ui-react';
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
NavLanguageSelector.propTypes = {
  value: PropTypes.string,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
      flag: PropTypes.string,
    })
  ),
  onChange: PropTypes.func.isRequired,
};
NavLanguageSelector.defaultProps = {
  value: 'en-US',
  languages: [
    {key: 1, text: 'English', value: 'en-US', flag: 'us'},
    {key: 2, text: 'Deutsch', value: 'de-CH', flag: 'ch'},
    {key: 3, text: 'Српски', value: 'sr-SP', flag: 'rs'},
    {key: 4, text: 'Русский', value: 'ru-RU', flag: 'ru'},
  ],
};
