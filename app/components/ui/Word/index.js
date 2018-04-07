// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _map from 'lodash/map';
// components
import Checkbox from 'components/ui/form/Checkbox';
import styles from './index.css';

export default function WordItem({data, style, onCheck}) {
  const handleChange = (event, {checked}) => onCheck(data.id, checked);
  return (
    <div className={styles.row} style={style}>
      <div className={styles.checkbox}>
        <Checkbox onChange={handleChange} />
      </div>
      <div className={styles.text}>{data.word}</div>
      <div className={styles.text}>{_map(data.translations, 'text').join(', ')}</div>
      <div className={styles.text}>{data.wordSet.title}</div>
    </div>
  );
}
WordItem.propTypes = {};
