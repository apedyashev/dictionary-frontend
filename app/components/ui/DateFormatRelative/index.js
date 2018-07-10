// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
// TODO: de locale wasn't ready in in alpha-9
import {enUS, ru, de} from 'date-fns/esm/locale';

const localesMap = {en: enUS, ru, de};
export default function DateFormatRelative({date, time, baseDate, className, locale}) {
  const timeParts = time.split(':');
  const dateObject = new Date(date);
  dateObject.setHours(timeParts[0]);
  dateObject.setMinutes(timeParts[1]);
  const result = formatRelative(dateObject, baseDate, {
    locale: localesMap[locale.toLowerCase()],
    addSuffix: true,
  });

  return <span className={className}>{result}</span>;
}
DateFormatRelative.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  baseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
  locale: PropTypes.string,
  time: PropTypes.string.isRequired,
};
DateFormatRelative.defaultProps = {
  baseDate: new Date(),
  className: '',
  locale: 'en',
};
