// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Button} from 'semantic-ui-react';
// other
import styles from './index.css';

export default function TopbarIconButton({icon, className, onClick}) {
  return <Button className={cn(styles.root, className)} icon={icon} onClick={onClick} />;
}
TopbarIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
