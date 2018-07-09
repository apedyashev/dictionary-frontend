// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Responsive} from 'semantic-ui-react';
import {Topbar, TopbarButton} from 'components/ui';
import SidebarOpenerIcon from 'containers/SidebarOpenerIcon';

export default function StandardTopbar({title}) {
  return (
    <Topbar as={Responsive} {...Responsive.onlyMobile} title={title}>
      <TopbarButton>
        <SidebarOpenerIcon />
      </TopbarButton>
    </Topbar>
  );
}
StandardTopbar.propTypes = {
  title: PropTypes.string,
};
