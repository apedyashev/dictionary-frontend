// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import cn from 'classnames';
// components
import {FormatWordDefinitions, FormatWordExamples} from 'components';
// other
import styles from './index.css';

export default function WordDefinition({word, directTranslation, withBottomMargin}) {
  return (
    <div className={cn(styles.root, {[styles.withBottomMargin]: withBottomMargin})}>
      {directTranslation ? word.get('word') : <FormatWordDefinitions word={word.toJS()} />}
      <FormatWordExamples word={word.toJS()} directTranslation={directTranslation} />
    </div>
  );
}
WordDefinition.propTypes = {
  word: PropTypes.instanceOf(Immutable.Map),
  directTranslation: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
};
