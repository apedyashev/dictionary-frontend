// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {DateFormatRelative} from '../ui';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
// other
import messages from './messages';
import styles from './index.css';

export default function ScheduleItem({data, locale, time, style}) {
  return (
    <div className={styles.root} style={style}>
      <DateFormatRelative className={styles.date} date={data.date} time={time} locale={locale} />
      {data.dictionaries.map((dictionary) => (
        <div key={dictionary.id} className={styles.dictionaryContainer}>
          <Link to={`/dictionaries/${dictionary.slug}`} className={styles.name}>
            {dictionary.title}
          </Link>{' '}
          <span className={styles.description}>
            {' '}
            <FormattedMessage
              {...messages.reviewWordsRemainder}
              values={{
                wordsCount: dictionary.words.length,
              }}
            />
          </span>{' '}
          {isSameDay(data.date, new Date()) && (
            <Link
              to={`/learn-words/${dictionary.slug}/scheduled/${format(data.date, 'YYYY-MM-dd')}`}
            >
              <FormattedMessage {...messages.learnAgainLink} />
            </Link>
          )}{' '}
          <div>{dictionary.words.map((word) => word.title).join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
ScheduleItem.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
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
  time: PropTypes.string,
  style: PropTypes.object,
  locale: PropTypes.string,
};
ScheduleItem.defaultProps = {
  time: '18:00',
};
