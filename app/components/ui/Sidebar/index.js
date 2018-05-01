// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar, Menu} from 'semantic-ui-react';
import SidebarItem from '../SidebarItem';
// other
import styles from './index.css';

export default function SidebarUI({items}) {
  return (
    <Sidebar
      vertical
      as={Menu}
      animation="overlay"
      width="thin"
      visible
      icon="labeled"
      className={styles.root}
    >
      {items.map(
        (item) => (React.isValidElement(item) ? item : <SidebarItem key={item.title} {...item} />)
      )}
    </Sidebar>
  );
}
SidebarUI.propTypes = {
  items: PropTypes.array.isRequired,
};
