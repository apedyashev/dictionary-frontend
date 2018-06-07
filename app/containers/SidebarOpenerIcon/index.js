// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// actions
import {showSidebar} from './actions';
// components
import {Icon} from 'components/ui';
// other
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

function SidebarOpenerIcon({showSidebar}) {
  return <Icon name="sidebar" hoverable={false} onClick={showSidebar} />;
}
SidebarOpenerIcon.propTypes = {};

const withConnect = connect(null, {showSidebar});
const withReducer = injectReducer({key: 'sidebar', reducer});

export default compose(withReducer, withConnect)(SidebarOpenerIcon);
