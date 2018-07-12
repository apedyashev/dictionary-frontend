// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
import {injectIntl, intlShape} from 'react-intl';
// actions
import {logout, resetAuth, setLoggingOut} from 'containers/App/actions';
import {hideSidebar} from 'containers/SidebarOpenerIcon/actions';
// selectors
import {makeSelectLocationPath, makeSelectProfileData} from 'containers/App/selectors';
// components
import {Sidebar} from 'components/ui';
import UserMenuButton from '../UserMenuButton';
// other
import {sidebarUserType} from 'propTypes/user';
import messages from './messages';
import styles from './index.css';

// eslint-disable-next-line no-shadow
function DashboardSidebar({
  userData,
  visible,
  logout,
  resetAuth,
  push,
  setLoggingOut,
  hideSidebar,
  onHide,
  intl: {formatMessage},
}) {
  const items = [
    {
      key: 'my-dictionaries',
      title: formatMessage(messages.dictionariesTitle),
      iconName: 'book',
      linkTo: '/dictionaries',
      onClick() {
        hideSidebar();
      },
    },
    {
      key: 'my-schedule',
      title: formatMessage(messages.scheduleTitle),
      iconName: 'calendar',
      linkTo: '/schedule',
      onClick() {
        hideSidebar();
      },
    },
    <UserMenuButton
      key="user-menu-btn"
      userData={userData}
      className={styles.profile}
      onLogout={onLogout}
      onClick={hideSidebar}
    />,
  ];

  function onLogout() {
    setLoggingOut(true);
    new Promise((resolve, reject) => {
      logout({resolve, reject});
    }).finally(() => {
      resetAuth();
      localStorage.setItem('authToken', '');
      push('/login');
      setLoggingOut(false);
    });
  }

  return <Sidebar items={items} visible={visible} onHide={onHide} />;
}
DashboardSidebar.propTypes = {
  userData: sidebarUserType,
  logout: PropTypes.func.isRequired,
  resetAuth: PropTypes.func.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  setLoggingOut: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  visible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // locationPath isn't used but required to update NavLinks state in the sidebar
  locationPath: makeSelectLocationPath(),
  userData: makeSelectProfileData(),
});
export default connect(
  mapStateToProps,
  {
    setLoggingOut,
    resetAuth,
    logout,
    push,
    hideSidebar,
  }
)(injectIntl(DashboardSidebar));
