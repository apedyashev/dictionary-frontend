// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import TopbarButton from '../TopbarButton';
// other
import styles from './index.css';

export default function TopbarTitle({title, omitSeparator}) {
  return (
    <TopbarButton className={styles.title} omitSeparator={omitSeparator}>
      {title}
    </TopbarButton>
  );
}
TopbarTitle.propTypes = {
  title: PropTypes.string,
  omitSeparator: PropTypes.bool,
};
