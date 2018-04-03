// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Dropdown as DropdownSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Dropdown({value, options, onChange}) {
  const handleChange = (e, data) => onChange(data.value);
  return (
    <div basic className={styles.dropdownWrappingBtn}>
      <DropdownSUI
        className={styles.dropdown}
        value={value}
        options={options}
        simple
        item
        onChange={handleChange}
      />
    </div>
  );
}
Dropdown.propTypes = {
  text: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func.isRequired,
};
