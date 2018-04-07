// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Icon, Menu, Button, Popup} from 'semantic-ui-react';
import WordSetSelector from '../../WordSetSelector/WithAddForm';
// other
import styles from './index.css';

export default function SelectedWordsToolbar({
  dictionaryId,
  wordSetId,
  selectedWordsCount,
  onWordSetChange,
}) {
  return (
    <React.Fragment>
      <div className={styles.wordsCount}>{selectedWordsCount}</div>
      <div>
        <WordSetSelector
          allowAddNew
          value={wordSetId}
          dictionaryId={dictionaryId}
          simple={false}
          item={false}
          onChange={onWordSetChange}
        />
      </div>
      <div>
        <Popup position="bottom left" trigger={<Button icon="target" />} content="TBD" />
      </div>
      <div>
        <Popup position="bottom left" trigger={<Button icon="trash" />} content="Delete words" />
      </div>
    </React.Fragment>
  );
}
SelectedWordsToolbar.propTypes = {};
