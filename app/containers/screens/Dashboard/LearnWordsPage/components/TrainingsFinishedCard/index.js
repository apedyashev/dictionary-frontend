// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {Button, WhiteBoard, H2} from 'components/ui';
// other
import styles from './index.css';

export default function TrainingsFinishedCard({
  wordsLearned,
  totalWords,
  slug,
  onReinitilizeClick,
}) {
  return (
    <WhiteBoard>
      <div className={styles.results}>
        <H2>Great! </H2>
        You learned {wordsLearned} words out of {totalWords}
      </div>
      <div className={styles.buttons}>
        <Button onClick={onReinitilizeClick}>Learn next words</Button>
        <Button as={Link} to={`/dictionaries/${slug}`}>
          Back to the dictionary
        </Button>
      </div>
    </WhiteBoard>
  );
}
TrainingsFinishedCard.propTypes = {
  wordsLearned: PropTypes.number.isRequired,
  totalWords: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  onReinitilizeClick: PropTypes.func.isRequired,
};
