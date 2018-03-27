import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Container, Image, Menu, Button, Dropdown} from 'semantic-ui-react';
// import LanguageSelector from 'components/ui/LanguageSelector';
import LanguageSelector from 'containers/LocaleToggle';

const NavbarDesktop = ({language, onLanguageChange}) => (
  <Menu fixed="top" pointing secondary>
    <Container>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary>Sign in</Button>
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

NavbarDesktop.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.object),
  rightItems: PropTypes.arrayOf(PropTypes.object),
};

export default NavbarDesktop;
