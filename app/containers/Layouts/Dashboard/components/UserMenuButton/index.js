// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {FormattedMessage} from 'react-intl';
// components
import {NavLink} from 'react-router-dom';
import {DropdownIcon} from 'components/ui';
// import LanguageSelector from 'containers/LocaleToggle';
// other
import {sidebarUserType} from 'propTypes/user';
import messages from './messages';

export default function UserMenuButton({userData, className, onLogout, onClick}) {
  const options = [
    {
      key: 'user',
      text: (
        <span>
          <FormattedMessage
            {...messages.currentUserItem}
            values={{
              fullName: (
                <strong>
                  {userData.firstName} {userData.lastName}
                </strong>
              ),
            }}
          />
        </span>
      ),
      disabled: true,
    },
    // TODO: finish it
    // {
    //   key: 'language-selector',
    //   text: <LanguageSelector asNestedItem />,
    // },
    {
      key: 'settings',
      text: <FormattedMessage {...messages.settingsItem} />,
      as: NavLink,
      exact: true,
      to: '/settings',
      onClick,
    },

    {
      key: 'logout',
      text: <FormattedMessage {...messages.logoutItem} />,
      onClick: () => {
        onLogout();
        onClick();
      },
    },
  ];

  return <DropdownIcon options={options} iconName="user" hoverable upward className={className} />;
}
UserMenuButton.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  userData: sidebarUserType,
};
UserMenuButton.defaultProps = {
  className: '',
};
