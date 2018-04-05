// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _map from 'lodash/map';
// components
import {Checkbox} from 'semantic-ui-react';
import styles from './index.css';

export default function WordItem({data, style}) {
  return (
    <div className={styles.row} style={style}>
      <div className={styles.checkbox}>
        <Checkbox />
      </div>
      <div className={styles.text}>{data.word}</div>
      <div className={styles.text}>{_map(data.translations, 'text').join(', ')}</div>
    </div>
  );
}
WordItem.propTypes = {};
