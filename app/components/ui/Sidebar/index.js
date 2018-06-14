// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Sidebar as SidebarSUI, Menu, Dimmer, Responsive} from 'semantic-ui-react';
import SidebarItem from '../SidebarItem';
// other
import styles from './index.css';

export default function Sidebar({items, visible, onHide}) {
  return (
    <React.Fragment>
      <SidebarSUI
        vertical
        visible={visible}
        as={Menu}
        animation="overlay"
        width="thin"
        icon="labeled"
        className={styles.root}
      >
        {items.map(
          (item) => (React.isValidElement(item) ? item : <SidebarItem key={item.title} {...item} />)
        )}
      </SidebarSUI>
      <Responsive {...Responsive.onlyMobile}>
        <Dimmer active={visible} onClick={onHide} />
      </Responsive>
    </React.Fragment>
  );
}
Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  visible: PropTypes.bool,
  onHide: PropTypes.func,
};
