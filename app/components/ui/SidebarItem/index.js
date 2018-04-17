// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react';

export default function SidebarItem({title, linkTo, iconName}) {
  return (
    <Menu.Item name={title} as={NavLink} to={linkTo}>
      <Icon name={iconName} />
      {title}
    </Menu.Item>
  );
}
SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};
