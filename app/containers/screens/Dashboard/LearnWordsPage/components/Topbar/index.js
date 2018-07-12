// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Topbar} from 'components/ui';
import {Icon, Menu} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
// other
import messages from './messages';

export default function LearnWordsTopbar({dictionarySlug}) {
  return (
    <Topbar>
      <Menu.Item as={Link} to={`/dictionaries/${dictionarySlug}`}>
        <Icon name="arrow left" /> <FormattedMessage {...messages.backToDictTitle} />
      </Menu.Item>
    </Topbar>
  );
}
LearnWordsTopbar.propTypes = {
  dictionarySlug: PropTypes.string.isRequired,
};
