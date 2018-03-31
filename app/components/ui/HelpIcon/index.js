// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Icon, Popup} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function HelpIcon({text}) {
  return (
    <Popup trigger={<Icon className={cn('small', styles.root)} circular name="question" />}>
      {text}
    </Popup>
  );
}
HelpIcon.propTypes = {
  text: PropTypes.string.isRequired,
};
