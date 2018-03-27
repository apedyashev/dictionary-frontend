import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Container, Image, Menu, Button, Dropdown} from 'semantic-ui-react';
import LanguageSelector from './LanguageSelector';

const languages = [
  {key: 1, text: 'English', value: 'en', flag: 'us'},
  {key: 2, text: 'Deutsch', value: 'de', flag: 'ch'},
  {key: 3, text: 'Русский', value: 'ru', flag: 'ru'},
  {key: 4, text: 'Српски', value: 'rs', flag: 'rs'},
];

const NavbarDesktop = ({language, onLanguageChange}) => (
  <Menu fixed="top" pointing secondary>
    <Container>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary>Sign in</Button>
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector value={language} languages={languages} onChange={onLanguageChange} />
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
