// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {NavLink} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';
import Icon from '../Icon';
// other
import styles from './index.css';

export default function UserMenuButton({className, onLogout}) {
  // TODO: must be passed as props from top-level component
  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>Bob Smith</strong>
        </span>
      ),
      disabled: true,
    },
    {key: 'settings', text: 'Settings', as: NavLink, to: '/settings'},
    {key: 'logout', text: 'Logout', onClick: onLogout},
  ];

  return (
    <div className={cn(styles.root, className)}>
      <Dropdown trigger={<Icon name="user" hoverable />} options={options} upward />
    </div>
  );
}
UserMenuButton.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};
UserMenuButton.defaultProps = {
  className: '',
};
