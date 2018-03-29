// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar, Menu} from 'semantic-ui-react';
import SidebarItem from '../SidebarItem';

export default function SidebarUI({items}) {
  return (
    <Sidebar as={Menu} animation="overlay" width="thin" visible icon="labeled" vertical>
      {items.map((item) => <SidebarItem key={item.title} {...item} />)}
    </Sidebar>
  );
}
SidebarUI.propTypes = {};
