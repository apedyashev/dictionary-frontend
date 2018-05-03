// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
// import differenceInDays from 'date-fns/differenceInDays';
import {en, ru, de, sr} from 'date-fns/esm/locale';
// components

export default function DateFormatRelative({date, baseDate, className}) {
  // const diff = differenceInDays(date, baseDate);
  // let result;
  // if (Math.abs(diff) < 6) {
  const result = formatRelative(date, baseDate, {
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
