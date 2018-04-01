// libs
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// components
import H2 from '../typography/H2';
import styles from './index.css';

export default function EmptyListPrompt({title, subtitle}) {
  return (
    <div className={styles.root}>
      <div className={cn(styles.item, styles.title)}>{title}</div>
      <div className={cn(styles.item, styles.subtitle)}>{subtitle}</div>
    </div>
  );
}

EmptyListPrompt.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
