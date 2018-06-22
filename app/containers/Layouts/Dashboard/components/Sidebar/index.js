// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {logout, resetAuth, setLoggingOut} from 'containers/App/actions';
import {hideSidebar} from 'containers/SidebarOpenerIcon/actions';
// selectors
import {makeSelectLocationPath, makeSelectProfileData} from 'containers/App/selectors';
// components
import {Sidebar} from 'components/ui';
import UserMenuButton from '../UserMenuButton';
// other
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
}) {
  const items = [
    {
      key: 'my-dictionaries',
      title: 'my dictionaries',
      iconName: 'book',
      linkTo: '/dictionaries',
      onClick() {
        hideSidebar();
      },
    },
    {
      key: 'my-schedule',
      title: 'my schedule',
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
  logout: PropTypes.func.isRequired,
  resetAuth: PropTypes.func.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  setLoggingOut: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // locationPath isn't used but required to update NavLinks state in the sidebar
  locationPath: makeSelectLocationPath(),
  userData: makeSelectProfileData(),
});
export default connect(mapStateToProps, {
  setLoggingOut,
  resetAuth,
  logout,
  push,
  hideSidebar,
})(DashboardSidebar);
