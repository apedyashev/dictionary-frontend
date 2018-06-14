// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Responsive} from 'semantic-ui-react';
import {Topbar, TopbarButton} from 'components/ui';
import SidebarOpenerIcon from 'containers/SidebarOpenerIcon';

export default function SchedulePageTopbar() {
  return (
    <Topbar as={Responsive} {...Responsive.onlyMobile} title="Upcoming events">
      <TopbarButton>
        <SidebarOpenerIcon />
      </TopbarButton>
    </Topbar>
  );
}
SchedulePageTopbar.propTypes = {};
