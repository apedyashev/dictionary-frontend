// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {FormattedMessage} from 'react-intl';
// components
import {DropdownIcon} from 'components/ui';
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
      key: 'dictionaries',
      text: <FormattedMessage {...messages.dictionariesToggleBtnText} />,
      active: showDictionaries,
      onClick: onShowDictsToggle,
    },
  ];
  if (selectedDictionaryId) {
    options.push(
      {
        key: 'learn-words',
        text: selectedWordsCount ? (
          <FormattedMessage {...messages.learnSelectedBtnLabel} values={{selectedWordsCount}} />
        ) : (
          <FormattedMessage {...messages.learnBtnLabel} />
        ),
        onClick: onLearnClick,
      },
      <WordSetSelector
        key="wordsets"
        allWordsText={<FormattedMessage {...messages.wordSetSelectorAllWordsText} />}
        dictionaryId={selectedDictionaryId}
        value={selectedWordSetId}
        onChange={onWordSetChange}
      />
    );
  }

  return (
    <div className={className}>
      <DropdownIcon options={options} iconName="ellipsis horizontal" />
    </div>
  );
}
TopbarMobileDropdown.propTypes = {
  className: PropTypes.string,
  showDictionaries: PropTypes.bool.isRequired,
  selectedDictionaryId: PropTypes.string,
  selectedWordSetId: PropTypes.string,
  selectedWordsCount: PropTypes.number,
  messages: PropTypes.object.isRequired,
  onShowDictsToggle: PropTypes.func.isRequired,
  onWordSetChange: PropTypes.func.isRequired,
  onLearnClick: PropTypes.func.isRequired,
};
