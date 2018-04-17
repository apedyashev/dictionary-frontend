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
  scrolling,
  options,
  simple,
  item,
  trigger,
  className,
  children,
  onChange,
}) {
  const handleChange = (e, {value: newValue}) => {
    onChange(newValue);
  };
  return (
    <div className={cn(styles.dropdownWrappingBtn, className)}>
      <DropdownSUI
        open={open}
        scrolling={scrolling}
        className={styles.dropdown}
        trigger={trigger}
        value={value}
        options={options}
        simple={simple}
        item={item}
        onChange={handleChange}
      >
        {children}
      </DropdownSUI>
    </div>
  );
}
Dropdown.propTypes = {
  value: PropTypes.any,
  open: PropTypes.bool,
  scrolling: PropTypes.bool,
  item: PropTypes.bool,
  simple: PropTypes.bool,
  className: PropTypes.string,
  trigger: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  children: PropTypes.any,
};
Dropdown.defaultProps = {
  simple: true,
  item: true,
  onChange: () => {},
};
