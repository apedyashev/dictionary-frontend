// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// other
import styles from './index.css';

export default function FormatWordExamples({word, directTranslation}) {
  return (
    <div className={styles.root}>
      {directTranslation
        ? word.translations.map((def) => def.examples.join(', ')).join(', ')
        : word.translations.map((def) => def.synonyms.join(', ')).join(', ')}
    </div>
  );
}
FormatWordExamples.propTypes = {};
