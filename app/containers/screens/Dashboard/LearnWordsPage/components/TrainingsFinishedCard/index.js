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
  let resultTitle;
  if (wordsLearned === 0) {
    resultTitle = "Dont't be upset!";
  } else if (wordsLearned === totalWords) {
    resultTitle = 'It was impressive!';
  } else if (wordsLearned < totalWords && Math.floor(wordsLearned >= totalWords / 2)) {
    resultTitle = 'Well done!';
  } else if (wordsLearned > 0 && Math.floor(wordsLearned < totalWords / 2)) {
    resultTitle = 'Try to do your best next time!';
  }
  return (
    <WhiteBoard className={styles.root}>
      <div className={styles.results}>
        <H2>{resultTitle}</H2>
        You learned <b>{wordsLearned}</b> words out of <b>{totalWords}</b>
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
