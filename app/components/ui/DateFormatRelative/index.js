// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
// import differenceInDays from 'date-fns/differenceInDays';
import {en, ru, de, sr} from 'date-fns/esm/locale';
// components

export default function DateFormatRelative({date, time, baseDate, className}) {
  // const diff = differenceInDays(date, baseDate);
  // let result;
  // if (Math.abs(diff) < 6) {
  console.log('date', date);
  const timeParts = time.split(':');
  const dateObject = new Date(date);
  dateObject.setHours(timeParts[0]);
  dateObject.setMinutes(timeParts[1]);
  const result = formatRelative(dateObject, baseDate, {
    locale: de,
    addSuffix: true,
  });
  // } else {
  //   result = format(date, 'LL');
  // }
  return <span className={className}>{result}</span>;
}
DateFormatRelative.propTypes = {
  date: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  baseDate: PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
};
DateFormatRelative.defaultProps = {
  baseDate: new Date(),
  className: '',
};
