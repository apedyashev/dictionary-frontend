// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react';

export default function SidebarItem({title, linkTo, iconName, className, onClick}) {
  return (
    <Menu.Item
      name={title}
      as={NavLink}
      to={linkTo}
      className={className}
      selected={false}
      onClick={onClick}
    >
      <Icon name={iconName} />
      {title}
    </Menu.Item>
  );
}
SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
