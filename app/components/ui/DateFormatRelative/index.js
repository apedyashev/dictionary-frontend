// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import formatRelative from 'date-fns/formatRelative';
import {ru} from 'date-fns/esm/locale';
// components

export default function DateFormatRelative({date, baseDate, className}) {
  return (
    <span className={className}>
      {formatRelative(date, baseDate, {
        locale: ru,
        addSuffix: true,
      })}
    </span>
  );
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
