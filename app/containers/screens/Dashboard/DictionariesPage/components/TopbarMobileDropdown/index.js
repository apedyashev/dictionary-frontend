// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {FormattedMessage} from 'react-intl';
// components
import {Dropdown, Menu} from 'semantic-ui-react';
import {DropdownIcon} from 'components/ui';
import {Icon} from 'components/ui';
import WordSetSelector from '../WordSetSelector';

export default function TopbarMobileDropdown({
  className,
  showDictionaries,
  selectedDictionaryId,
  selectedWordSetId,
  selectedWordsCount,
  messages,
  onShowDictsToggle,
  onWordSetChange,
  onLearnClick,
}) {
  const options = [
    {
      key: 'learn-words',
      text: selectedWordsCount ? (
        <FormattedMessage {...messages.learnSelectedBtnLabel} values={{selectedWordsCount}} />
      ) : (
        <FormattedMessage {...messages.learnBtnLabel} />
      ),
      onClick: onLearnClick,
    },
    {
      key: 'dictionaries',
      text: 'Dictionaries',
      active: showDictionaries,
      onClick: onShowDictsToggle,
    },
    <WordSetSelector
      key="wordsets"
      dictionaryId={selectedDictionaryId}
      value={selectedWordSetId}
      onChange={onWordSetChange}
    />,
  ];

  return (
    <div className={className}>
      <DropdownIcon options={options} iconName="ellipsis horizontal" />
    </div>
  );
}
TopbarMobileDropdown.propTypes = {};
