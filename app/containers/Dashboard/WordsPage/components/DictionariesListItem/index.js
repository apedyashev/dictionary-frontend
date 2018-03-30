// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Menu, Icon} from 'semantic-ui-react';

export default function DictionariesListItem({item}) {
  return (
    <Menu.Item name={item.title}>
      <Icon name="home" />
      {item.title}
    </Menu.Item>
  );
}
DictionariesListItem.propTypes = {};
