// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import Icon from '../Icon';
// other
import styles from './index.css';
import '!file-loader?name=[name].[ext]!images/no-image.png';

export default function PromptingImage({src, isRemoveInProgress, onRemoveClick}) {
  return (
    <div className={styles.root}>
      <span className={styles.imageWrapper}>
        <img src={src || '/no-image.png'} className={styles.image} />
        <Icon
          name={isRemoveInProgress ? 'spinner' : 'close'}
          disabled={isRemoveInProgress}
          loading={isRemoveInProgress}
          className={styles.icon}
          onClick={onRemoveClick}
        />
      </span>
    </div>
  );
}
PromptingImage.propTypes = {};
