// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Image, Menu, Button, Dropdown} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function DashboardTopbar() {
  return (
    <Menu fixed="top" pointing secondary>
      <Container>
        <Menu.Menu position="left">
          <Menu.Item>d</Menu.Item>
          <Menu.Item>vc</Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>d</Menu.Item>
          <Menu.Item>vc</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
DashboardTopbar.propTypes = {};
