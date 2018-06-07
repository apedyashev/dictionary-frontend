// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {hideSidebar} from 'containers/SidebarOpenerIcon/actions';
// selectors
import {makeSelectSidebarVisible} from 'containers/SidebarOpenerIcon/selectors';
// components
import {Responsive} from 'semantic-ui-react';
import {Sidebar} from './components';
// other
import styles from './index.css';

function DashboardLayout({children, isSidebarVisible, hideSidebar}) {
  return (
    <div className={styles.root}>
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Sidebar visible />
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Sidebar visible={isSidebarVisible} onHide={hideSidebar} />
        </Responsive>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const mapStateToProps = createStructuredSelector({
  isSidebarVisible: makeSelectSidebarVisible(),
});

export default connect(mapStateToProps, {hideSidebar})(DashboardLayout);
