// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {ConfirmableButton} from 'components/ui';
import {Button, Popup} from 'semantic-ui-react';
import WordSetSelector from '../../WordSetSelector/WithAddForm';
// other
import styles from './index.css';

export default function SelectedWordsToolbar({
  dictionaryId,
  wordSetId,
  selectedWordsCount,
  onWordSetChange,
  onWordsDeleteClick,
}) {
  return (
    <React.Fragment>
      <div className={styles.wordsCount}>{selectedWordsCount}</div>
      <div className={styles.buttonContainer}>
        <WordSetSelector
          allowAddNew
          value={wordSetId}
          dictionaryId={dictionaryId}
          simple={false}
          item={false}
          onChange={onWordSetChange}
        />
      </div>
      <div style={{display: 'none'}} className={styles.buttonContainer}>
        <Popup position="bottom left" trigger={<Button icon="target" />} content="TBD" />
      </div>
      <div className={styles.buttonContainer}>
        <ConfirmableButton
          icon="trash"
          position="bottom left"
          hoverContent="Delete words"
          clickContent="Are you sure?"
          onConfirm={onWordsDeleteClick}
        />
      </div>
    </React.Fragment>
  );
}
SelectedWordsToolbar.propTypes = {
  dictionaryId: PropTypes.string.isRequired,
  wordSetId: PropTypes.string.isRequired,
  selectedWordsCount: PropTypes.number.isRequired,
  onWordSetChange: PropTypes.func.isRequired,
  onWordsDeleteClick: PropTypes.func.isRequired,
};
