// libs
import React from 'react';
import {PropTypes} from 'prop-types';
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
  onShowDictsToggle,
  onWordSetChange,
}) {
  const options = [
    {
      key: 'dictionaries',
      text: 'Dictionaries',
      active: showDictionaries,
      onClick: onShowDictsToggle,
    },
    <WordSetSelector
      selectedDictionaryId={selectedDictionaryId}
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
