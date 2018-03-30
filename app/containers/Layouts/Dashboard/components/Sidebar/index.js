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
    title: 'schedule',
    iconName: 'calendar',
    linkTo: '/schedule',
  },
];
export default function DashboardSidebar() {
  return <Sidebar items={items} />;
}
DashboardSidebar.propTypes = {};
