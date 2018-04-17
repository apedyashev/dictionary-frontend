import PropTypes from 'prop-types';
import React from 'react';
import {Container, Menu} from 'semantic-ui-react';
import LanguageSelector from 'containers/LocaleToggle';
import AuthButton from '../AuthButton';

const NavbarDesktop = ({showLogin}) => (
  <Menu fixed="top" pointing secondary>
    <Container>
      <Menu.Menu position="right">
        <Menu.Item>
          <AuthButton showLogin={showLogin} />
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

NavbarDesktop.propTypes = {
  showLogin: PropTypes.bool,
};

export default NavbarDesktop;
