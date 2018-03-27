import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Container, Image, Menu, Button, Dropdown } from 'semantic-ui-react'
import LanguageSelector from './LanguageSelector';


const languages = [
  { key: 1, text: 'Русский', value: 'ru' },
  { key: 2, text: 'English', value: 'en' },
  { key: 3, text: 'Deutsch', value: 'de' },
]

const NavbarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed='top'  pointing secondary>
    <Container>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button primary>Sign in</Button>
        </Menu.Item>
        <Menu.Item>
          <LanguageSelector languages={languages} />
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)

NavbarDesktop.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.object),
  rightItems: PropTypes.arrayOf(PropTypes.object),
}

export default NavbarDesktop
