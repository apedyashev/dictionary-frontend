// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Link} from 'react-router-dom';
import {DateFormatRelative} from '../ui';
// other
import styles from './index.css';

export default function ScheduleItem({data, style}) {
  return (
    <div className={styles.root} style={style}>
      <DateFormatRelative className={styles.date} date={data.date} time="18:05" />
      {data.dictionaries.map((dictionary) => (
        <div key={dictionary.id} className={styles.dictionaryContainer}>
          <Link to={`/dictionaries/${dictionary.slug}`} className={styles.name}>
            {dictionary.title}
          </Link>{' '}
          <span className={styles.description}>
            {' '}
            {dictionary.words.length} words to be reviewed
          </span>
          <div>{dictionary.words.map((word) => word.title).join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
ScheduleItem.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
      .isRequired,
    dictionaries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        words: PropTypes.array.isRequired,
      })
    ).isRequired,
  }),
  style: PropTypes.object,
};
