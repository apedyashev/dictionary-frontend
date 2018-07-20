// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Topbar, TopbarButton, Icon} from 'components/ui';
import {FormattedMessage} from 'react-intl';
// other
import messages from './messages';

export default function LearnWordsTopbar({dictionarySlug}) {
  return (
    <Topbar>
      <TopbarButton as={Link} to={`/dictionaries/${dictionarySlug}`}>
        <Icon name="arrow left" /> <FormattedMessage {...messages.backToDictTitle} />
      </TopbarButton>
    </Topbar>
  );
}
LearnWordsTopbar.propTypes = {
  dictionarySlug: PropTypes.string.isRequired,
};
