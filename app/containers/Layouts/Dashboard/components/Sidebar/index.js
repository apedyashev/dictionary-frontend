// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar} from 'components/ui';

const items = [
  {
    title: 'home',
    iconName: 'home',
    linkTo: '/dashboard',
  },
  {
    title: 'calendar',
    iconName: 'calendar',
    linkTo: '/dashboard/calendar',
  },
];
export default function DashboardSidebar() {
  return <Sidebar items={items} />;
}
DashboardSidebar.propTypes = {};
