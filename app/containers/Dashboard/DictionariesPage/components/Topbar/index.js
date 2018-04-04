// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Icon, Menu, Button, Input} from 'semantic-ui-react';
// import {Input} from 'components/ui';
import WordsSearchBar from '../WordsSearchBar';
import WordSetSelector from '../WordSetSelector';
// other
import styles from './index.css';

export default function DashboardTopbar({
  selectedDictionaryId,
  translateDirection,
  showDictionaries,
  selectedWordSetId,
  onShowDictsToggle,
  onWordSetChange,
  onSearchChange,
}) {
  return (
    <Menu className={styles.root}>
      <Menu.Menu position="left">
        <Menu.Item name="editorials" active={showDictionaries} onClick={onShowDictsToggle}>
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
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>d</Menu.Item>
        <Menu.Item>vc</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
DashboardTopbar.propTypes = {};
