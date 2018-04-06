// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Dropdown as DropdownSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function Dropdown({
  value,
  open,
  options,
  simple,
  item,
  trigger,
  className,
  children,
  onChange,
}) {
  const handleChange = (e, data) => onChange(data.value);
  return (
    <div className={cn(styles.dropdownWrappingBtn, className)}>
      <DropdownSUI
        open={open}
        className={styles.dropdown}
        trigger={trigger}
        value={value}
        options={options}
        simple={simple}
        item={item}
        onChange={handleChange}
        children={children}
      />
    </div>
  );
}
Dropdown.propTypes = {
  text: PropTypes.string,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func.isRequired,
};
Dropdown.defaultProps = {
  simple: true,
  item: true,
};
