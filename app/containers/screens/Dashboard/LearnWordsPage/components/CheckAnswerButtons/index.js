// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Button} from 'components/ui';
// other
import styles from './index.css';

export default function CheckAnswerButtons({nextBtnProps, skipBtnProps}) {
  return (
    <div className={styles.checkAnswerButtonsContainer}>
      {nextBtnProps && <Button {...nextBtnProps} className={styles.nextButton} />}
      {skipBtnProps && <Button {...skipBtnProps} className={styles.skipButton} />}
    </div>
  );
}
CheckAnswerButtons.propTypes = {
  nextBtnProps: PropTypes.object.isRequired,
  skipBtnProps: PropTypes.object.isRequired,
};
