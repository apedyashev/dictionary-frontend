// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Icon, Menu, Button, Input} from 'semantic-ui-react';
// import {Input} from 'components/ui';
import SelectedWordsToolbar from './SelectedWordsToolbar';
import WordsSearchBar from '../WordsSearchBar';
import WordSetSelector from '../WordSetSelector';
// other
import styles from './index.css';

export default function DashboardTopbar({
  selectedDictionaryId,
  translateDirection,
  showDictionaries,
  selectedWordSetId,
  selectedWordIds,
  onShowDictsToggle,
  onWordSetChange,
  onSearchChange,
  onWordsDeleteClick,
  onLearnClick,
}) {
  const selectedWordsCount = (selectedWordIds && selectedWordIds.length) || 0;
  return (
    <Menu className={styles.root}>
      <Menu.Menu position="left">
        {selectedWordIds && selectedWordIds.length ? (
          <SelectedWordsToolbar
            dictionaryId={selectedDictionaryId}
            wordSetId={selectedWordSetId}
            selectedWordsCount={selectedWordsCount}
            onWordSetChange={onWordSetChange}
            onWordsDeleteClick={onWordsDeleteClick}
          />
        ) : (
          <React.Fragment>
            <Menu.Item active={showDictionaries} onClick={onShowDictsToggle}>
              <Icon name="book" /> Dictionaries
            </Menu.Item>
            <Menu.Item className={styles.stipPadding}>
              <WordSetSelector
                dictionaryId={selectedDictionaryId}
                value={selectedWordSetId}
                onChange={onWordSetChange}
              />
            </Menu.Item>
            <Menu.Item className={styles.stipTopBottomPadding}>
              <WordsSearchBar
                buttonLabel="Add"
                placeholder="Type to search"
                dictionaryId={selectedDictionaryId}
                translateDirection={translateDirection}
                onChange={onSearchChange}
              />
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button
            content={selectedWordsCount ? `Learn selected (${selectedWordsCount})` : 'Learn'}
            onClick={onLearnClick}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
DashboardTopbar.propTypes = {};
