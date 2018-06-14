// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {logout, resetAuth, setLoggingOut} from 'containers/App/actions';
// selectors
import {makeSelectLocationPath} from 'containers/App/selectors';
// components
import {UserMenuButton, Sidebar} from 'components/ui';
// other
import styles from './index.css';

// eslint-disable-next-line no-shadow
function DashboardSidebar({visible, logout, resetAuth, push, setLoggingOut, onHide}) {
  const items = [
    {
      key: 'my-dictionaries',
      title: 'my dictionaries',
      iconName: 'book',
      linkTo: '/dictionaries',
    },
    {
      key: 'my-schedule',
      title: 'my schedule',
      iconName: 'calendar',
      linkTo: '/schedule',
    },
    <UserMenuButton key="user-menu-btn" className={styles.profile} onLogout={onLogout} />,
  ];

  function onLogout() {
    setLoggingOut(true);
    new Promise((resolve, reject) => {
      logout({resolve, reject});
    })
      // .then(() => {
      //   resetAuth();
      //   localStorage.setItem('authToken', '');
      //   push('/login');
      // })
      .finally(() => {
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
  push: PropTypes.func.isRequired,
  setLoggingOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // locationPath isn't used but required to update NavLinks state in the sidebar
  locationPath: makeSelectLocationPath(),
});
export default connect(mapStateToProps, {
  setLoggingOut,
  resetAuth,
  logout,
  push,
})(DashboardSidebar);
