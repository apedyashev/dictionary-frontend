// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NavLink} from 'react-router-dom';
import {DropdownIcon} from 'components/ui';

export default function UserMenuButton({userData, className, onLogout}) {
  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as{' '}
          <strong>
            {userData.firstName} {userData.lastName}
          </strong>
        </span>
      ),
      disabled: true,
    },
    {key: 'settings', text: 'Settings', as: NavLink, exact: true, to: '/settings'},
    {key: 'logout', text: 'Logout', onClick: onLogout},
  ];

  return <DropdownIcon options={options} iconName="user" hoverable upward className={className} />;
}
UserMenuButton.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};
UserMenuButton.defaultProps = {
  className: '',
};
