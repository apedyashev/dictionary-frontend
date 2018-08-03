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
  active,
  onClick,
}) {
  const handleClick = () => {
    onClick(definitionId, translationId);
  };
  return (
    <Dropdown.Item active={active} onClick={handleClick}>
      <div className={styles.pos}>{pos}</div>
      <div className={styles.synonyms}>
        {translation} {synonyms && synonyms.length ? <span>({synonyms.join(', ')})</span> : null}
      </div>
      {examples && examples.length ? (
        <div className={styles.examples}>
          <b>E.g:</b> {examples.join(', ')}
        </div>
      ) : null}
    </Dropdown.Item>
  );
}
SearchbarDropdownItem.propTypes = {
  translationId: PropTypes.string.isRequired,
  definitionId: PropTypes.string.isRequired,
  pos: PropTypes.string,
  translation: PropTypes.string.isRequired,
  synonyms: PropTypes.array,
  examples: PropTypes.array,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
