// libs
import React from 'react';
// components
import {UserMenuButton, Sidebar} from 'components/ui';
// other
import styles from './index.css';

const items = [
  {
    title: 'my dictionaries',
    iconName: 'book',
    linkTo: '/dictionaries',
  },
  {
    title: 'my schedule',
    iconName: 'calendar',
    linkTo: '/schedule',
  },
  <UserMenuButton className={styles.profile} />,
];
export default function DashboardSidebar() {
  return <Sidebar items={items} />;
}
DashboardSidebar.propTypes = {};
