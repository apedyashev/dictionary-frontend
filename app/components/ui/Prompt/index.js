// libs
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// components
import H2 from '../typography/H2';
import styles from './index.css';

export default function Prompt({title, subtitle}) {
  return (
    <div className={styles.root}>
      <H2 className={cn(styles.item, styles.title)}>{title}</H2>
      <div className={cn(styles.item, styles.subtitle)}>{subtitle}</div>
    </div>
  );
}

Prompt.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
