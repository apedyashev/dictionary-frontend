// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Icon, Menu, Button, Dropdown} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function DashboardTopbar({onShowDictsToggle}) {
  return (
    <Menu className={styles.root}>
      <Menu.Menu position="left">
        <Menu.Item name="editorials" active onClick={onShowDictsToggle}>
          <Icon name="book" /> Dictionaries
        </Menu.Item>
        <Menu.Item>vc</Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>d</Menu.Item>
        <Menu.Item>vc</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
DashboardTopbar.propTypes = {};
