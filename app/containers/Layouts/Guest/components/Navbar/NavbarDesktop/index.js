import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Container, Image, Menu, Button, Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import AuthButton from '../AuthButton';
// import LanguageSelector from 'components/ui/LanguageSelector';
import LanguageSelector from 'containers/LocaleToggle';

const NavbarDesktop = ({showLogin, language, onLanguageChange}) => (
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
  leftItems: PropTypes.arrayOf(PropTypes.object),
  rightItems: PropTypes.arrayOf(PropTypes.object),
};

export default NavbarDesktop;
