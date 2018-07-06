// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {FormatWordDefinitions, FormatWordExamples} from 'components';
// other
import styles from './index.css';

export default function WordDefinition({word, directTranslation}) {
  return (
    <div className={styles.root}>
      {directTranslation ? word.get('word') : <FormatWordDefinitions word={word.toJS()} />}
      <FormatWordExamples word={word.toJS()} directTranslation={directTranslation} />
    </div>
  );
}
WordDefinition.propTypes = {};