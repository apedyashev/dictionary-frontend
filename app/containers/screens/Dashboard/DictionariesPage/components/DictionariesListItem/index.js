// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {NavLink} from 'react-router-dom';
import {Menu, Label, Popup} from 'semantic-ui-react';

export default function DictionariesListItem({item}) {
  return (
    <Menu.Item
      as={NavLink}
      to={`/dictionaries/${item.slug}`}
      name={item.title}
      selected={false}
      exact
    >
      <Popup
        trigger={
          <Label>
            {item.stats.get('learnedWordsCount')}/{item.stats.get('wordsCount')}
          </Label>
        }
        content={`Learned ${item.stats.get('learnedWordsCount')} out of ${item.stats.get(
          'wordsCount'
        )} words`}
      />
      {item.title}
    </Menu.Item>
  );
}
DictionariesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
