// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {FormattedMessage} from 'react-intl';
import {Checkbox, ConfirmableButton} from 'components/ui';
import {Button, Menu, Popup} from 'semantic-ui-react';
import WordSetSelector from '../../WordSetSelector/WithAddForm';
// other
import messages from './messages';
import styles from './index.css';

export default function SelectedWordsToolbar({
  dictionaryId,
  wordSetId,
  selectedWordsCount,
  onWordSetChange,
  onWordsDeleteClick,
  onAllWordsUncheck,
}) {
  return (
    <React.Fragment>
      <Menu.Item className={styles.uncheckAllContainer}>
        <div className={styles.row}>{selectedWordsCount}</div>
        <div className={styles.row}>
          <Checkbox checked={selectedWordsCount > 0} onChange={onAllWordsUncheck} />
        </div>
      </Menu.Item>
      <Menu.Item className={styles.buttonsContainer}>
        <WordSetSelector
          allowAddNew
          value={wordSetId}
          dictionaryId={dictionaryId}
          simple={false}
          item={false}
          onChange={onWordSetChange}
        />

        <div style={{display: 'none'}} className={styles.buttonContainer}>
          <Popup position="bottom left" trigger={<Button icon="target" />} content="TBD" />
        </div>
        <div className={styles.buttonContainer}>
          <ConfirmableButton
            icon="trash"
            position="bottom left"
            hoverContent={<FormattedMessage {...messages.deleteWordsBtnHoverContent} />}
            clickContent={<FormattedMessage {...messages.deleteWordsBtnClickContent} />}
            yesButtonContent={<FormattedMessage {...messages.yesButtonContent} />}
            cancelButtonContent={<FormattedMessage {...messages.cancelButtonContent} />}
            onConfirm={onWordsDeleteClick}
          />
        </div>
      </Menu.Item>
    </React.Fragment>
  );
}
SelectedWordsToolbar.propTypes = {
  dictionaryId: PropTypes.string.isRequired,
  wordSetId: PropTypes.string.isRequired,
  selectedWordsCount: PropTypes.number.isRequired,
  onWordSetChange: PropTypes.func.isRequired,
  onWordsDeleteClick: PropTypes.func.isRequired,
  onAllWordsUncheck: PropTypes.func.isRequired,
};
