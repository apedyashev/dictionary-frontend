// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Sidebar, Menu, Icon} from 'semantic-ui-react';

export default function SidebarItem({title, linkTo, iconName}) {
  return (
    <Menu.Item name={title} as={Link} to={linkTo}>
      <Icon name={iconName} />
      {title}
    </Menu.Item>
  );
}
SidebarItem.propTypes = {};
