// libs
import React from 'react';
// components
import {UserMenuButton, Sidebar} from 'components/ui';
// other
import styles from './index.css';

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
  <UserMenuButton key="user-menu-btn" className={styles.profile} />,
];
export default function DashboardSidebar() {
  return <Sidebar items={items} />;
}
DashboardSidebar.propTypes = {};
