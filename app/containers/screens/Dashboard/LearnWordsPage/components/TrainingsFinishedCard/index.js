// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {Button, WhiteBoard, H2} from 'components/ui';
// other
import messages from './messages';
import styles from './index.css';

export default function TrainingsFinishedCard({
  wordsLearned,
  totalWords,
  slug,
  onReinitilizeClick,
}) {
  let resultTitle;
  if (wordsLearned === 0) {
    resultTitle = <FormattedMessage {...messages.resultZeroWordsLearned} />;
  } else if (wordsLearned === totalWords) {
    resultTitle = <FormattedMessage {...messages.resultAllWordsLearned} />;
  } else if (wordsLearned < totalWords && Math.floor(wordsLearned >= totalWords / 2)) {
    resultTitle = <FormattedMessage {...messages.resultMoreThanHalfWordsLearned} />;
  } else if (wordsLearned > 0 && Math.floor(wordsLearned < totalWords / 2)) {
    resultTitle = <FormattedMessage {...messages.resultLessThanHalfWordsLearned} />;
  }
  return (
    <WhiteBoard className={styles.root}>
      <div className={styles.results}>
        <H2>{resultTitle}</H2>
        <FormattedMessage
          {...messages.learnedWordsInfoMsg}
          values={{
            wordsLearned: <b>{wordsLearned}</b>,
            totalWords: <b>{totalWords}</b>,
          }}
        />
      </div>
      <div className={styles.buttons}>
        <Button positive onClick={onReinitilizeClick}>
          <FormattedMessage {...messages.learnNextWordsBtn} />
        </Button>
        <Button as={Link} to={`/dictionaries/${slug}`}>
          <FormattedMessage {...messages.backToDictBtn} />
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
