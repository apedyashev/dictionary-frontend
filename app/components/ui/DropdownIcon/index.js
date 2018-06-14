// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Dropdown} from 'semantic-ui-react';
import Icon from '../Icon';
// other
import styles from './index.css';

export default function DropdownIcon({options, iconName, hoverable, upward, className}) {
  return (
    <div className={cn(styles.root, className)}>
      <Dropdown
        trigger={<Icon name={iconName} hoverable={hoverable} />}
        options={options.map((option) => ({...option, selected: false}))}
        upward={upward}
      />
    </div>
  );
}
DropdownIcon.propTypes = {
  options: PropTypes.array.isRequired,
  iconName: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  upward: PropTypes.bool,
  className: PropTypes.string,
};
DropdownIcon.defaultProps = {
  className: '',
};
