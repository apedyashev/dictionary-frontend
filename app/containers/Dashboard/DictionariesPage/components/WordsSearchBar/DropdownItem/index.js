// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Dropdown} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function SearchbarDropdownItem({
  translationId,
  definitionId,
  pos,
  translation,
  synonyms,
  examples,
  onClick,
}) {
  const handleClick = () => {
    onClick(definitionId, translationId);
  };
  return (
    <Dropdown.Item onClick={handleClick}>
      <div className={styles.pos}>{pos}</div>
      <div className={styles.synonyms}>
        {translation} {synonyms && <span>({synonyms.join(', ')})</span>}
      </div>
      {examples && (
        <div className={styles.examples}>
          <b>E.g:</b> {examples.join(', ')}
        </div>
      )}
    </Dropdown.Item>
  );
}
SearchbarDropdownItem.propTypes = {};
