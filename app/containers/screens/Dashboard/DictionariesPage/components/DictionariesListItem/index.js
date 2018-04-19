// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Menu, Label, Popup} from 'semantic-ui-react';

export default function DictionariesListItem({item}) {
  return (
    <Menu.Item as={Link} to={`/dictionaries/${item.slug}`} name={item.title}>
      <Popup
        trigger={<Label>{item.stats.get('wordsCount')}</Label>}
        content={`${item.stats.get('wordsCount')} words`}
      />
      {item.title}
    </Menu.Item>
  );
}
DictionariesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
