// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Button, Dropdown} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function NavLanguageSelector({value, languages, asNestedItem, onChange}) {
  const handleChange = (e, data) => onChange(data.value);
  const dropdown = (
    <Dropdown
      icon={asNestedItem ? 'angle right' : 'world'}
      className={cn(styles.dropdown, {[styles.nestedItem]: asNestedItem})}
      value={value}
      options={languages}
      simple
      item
      onChange={handleChange}
    />
  );
  if (asNestedItem) {
    return dropdown;
  }
  return <Button className={styles.dropdownWrappingBtn}>{dropdown}</Button>;
}
NavLanguageSelector.propTypes = {
  value: PropTypes.string,
  asNestedItem: PropTypes.bool,
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
