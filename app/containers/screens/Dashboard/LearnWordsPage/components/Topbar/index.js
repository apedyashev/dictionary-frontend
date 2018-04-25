// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Topbar} from 'components/ui';
import {Icon, Menu} from 'semantic-ui-react';

export default function LearnWordsTopbar({dictionarySlug}) {
  return (
    <Topbar>
      <Menu.Item as={Link} to={`/dictionaries/${dictionarySlug}`}>
        <Icon name="arrow left" /> Back to the dictionary
      </Menu.Item>
    </Topbar>
  );
}
LearnWordsTopbar.propTypes = {
  dictionarySlug: PropTypes.string.isRequired,
};
