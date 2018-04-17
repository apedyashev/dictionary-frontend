// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _map from 'lodash/map';
// components
import Checkbox from 'components/ui/form/Checkbox';
import styles from './index.css';

export default function WordItem({data, checked, style, onCheck}) {
  const handleChange = (event, {checked: isChecked}) => onCheck(data.id, isChecked);
  return (
    <div className={styles.row} style={style}>
      <div className={styles.checkbox}>
        <Checkbox checked={checked} onChange={handleChange} />
      </div>
      <div className={styles.text}>{data.word}</div>
      <div className={styles.text}>{_map(data.translations, 'text').join(', ')}</div>
      <div className={styles.text}>{data.wordSet.title}</div>
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
  onCheck: PropTypes.func.isRequired,
};
