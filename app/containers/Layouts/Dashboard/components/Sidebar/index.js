// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar} from 'components/ui';

const items = [
  {
    title: 'home',
    iconName: 'home',
    linkTo: '/dictionaries',
  },
  {
    title: 'calendar',
    iconName: 'calendar',
    linkTo: '/calendar',
  },
];
export default function DashboardSidebar() {
  return <Sidebar items={items} />;
}
DashboardSidebar.propTypes = {};
