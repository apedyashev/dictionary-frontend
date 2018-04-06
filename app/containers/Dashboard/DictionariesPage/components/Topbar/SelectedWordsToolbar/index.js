// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Icon, Menu, Button, Popup} from 'semantic-ui-react';
import WordSetSelector from '../../WordSetSelector/WithAddForm';
// other
import styles from './index.css';

export default function SelectedWordsToolbar({dictionaryId, wordSetId, selectedWordIds}) {
  return (
    <React.Fragment>
      <div>
        <WordSetSelector
          allowAddNew
          trigger={
            <span>
              <Popup
                position="right center"
                trigger={<Button className={styles.triggerButton} icon="list" />}
                content="Add to a wordset"
              />
            </span>
          }
          className={styles.withIconTrigger}
          value={wordSetId}
          dictionaryId={dictionaryId}
          simple={false}
          item={false}
          onChange={() => {}}
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
