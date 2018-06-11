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
  icon,
  trigger,
  className,
  children,
  onChange,
  onClick,
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
        icon={icon}
        onChange={handleChange}
        onClick={onClick}
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
  icon: PropTypes.any,
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
  onClick: PropTypes.func,
  children: PropTypes.any,
};
Dropdown.defaultProps = {
  simple: true,
  item: true,
  onChange: () => {},
};
