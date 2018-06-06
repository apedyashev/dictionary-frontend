import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Icon, Image, Menu, Sidebar} from 'semantic-ui-react';

// import logo from 'resources/logo.png'
import * as styles from './index.css';

const NavbarMobile = ({children, leftItems, onPusherClick, onToggle, rightItems, visible}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      items={[
        {
          key: 'home',
          content: 'home',
          as: NavLink,
          exact: true,
          to: '/',
          onClick: onPusherClick,
        },
        {
          key: 'login',
          content: 'login',
          as: NavLink,
          to: '/login',
          exact: true,
          onClick: onPusherClick,
        },
        {
          key: 'register',
          content: 'register',
          as: NavLink,
          to: '/register',
          exact: true,
          onClick: onPusherClick,
        },
      ]}
      vertical
      visible={visible}
    />
    <Sidebar.Pusher dimmed={visible} onClick={onPusherClick} className={styles.pusher}>
      <Menu fixed="top" inverted>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

NavbarMobile.propTypes = {
  children: PropTypes.node,
  leftItems: PropTypes.arrayOf(PropTypes.object),
  onPusherClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  rightItems: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool.isRequired,
};

export default NavbarMobile;
