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
      <Button {...nextBtnProps} className={styles.nextButton} />
      <Button {...skipBtnProps} className={styles.skipButton} />
    </div>
  );
}
CheckAnswerButtons.propTypes = {};
