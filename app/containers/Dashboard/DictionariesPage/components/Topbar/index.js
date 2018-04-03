// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Container, Icon, Menu, Button} from 'semantic-ui-react';
// import {Dropdown} from 'components/ui';
import WordSetSelector from '../WordSetSelector';
// other
import styles from './index.css';

const options = [
  {key: 0, text: 'All words', value: 0},
  {key: 1, text: 'Choice 1', value: 1},
  {key: 2, text: 'Choice 2', value: 2},
  {key: 3, text: 'Choice 3', value: 3},
];

export default function DashboardTopbar({
  selectedDictionaryId,
  showDictionaries,
  selectedWordSetId,
  onShowDictsToggle,
  onWordSetChange,
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
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>d</Menu.Item>
        <Menu.Item>vc</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
DashboardTopbar.propTypes = {};
