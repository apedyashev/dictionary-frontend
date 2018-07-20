// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _map from 'lodash/map';
import cn from 'classnames';
// components
import Checkbox from 'components/ui/form/Checkbox';
import styles from './index.css';

export default function WordItem({data, checked, style, learnedLabelText, onCheck}) {
  const handleChange = (event, {checked: isChecked}) => onCheck(data.id, isChecked);
  return (
    <div className={cn(styles.row, {[styles.learned]: data.isLearned})} style={style}>
      <div className={styles.checkbox}>
        <Checkbox checked={checked} onChange={handleChange} />
      </div>
      <div className={styles.text}>{data.word}</div>
      <div className={styles.text}>{_map(data.translations, 'text').join(', ')}</div>
      <div className={styles.text}>{data.wordSet.title}</div>
      <div className={styles.text}>{data.isLearned && learnedLabelText}</div>
    </div>
  );
}
WordItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired,
    translations: PropTypes.array.isRequired,
    wordSet: PropTypes.shape({title: PropTypes.string.isRequired}).isRequired,
  }).isRequired,
  checked: PropTypes.bool,
  style: PropTypes.object,
  learnedLabelText: PropTypes.string,
  onCheck: PropTypes.func.isRequired,
};

WordItem.defaultProps = {
  learnedLabelText: 'learned',
};
