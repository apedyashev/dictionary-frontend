// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from './index.css';

export default function AppContainer({
  topbar,
  withMobileTopbar,
  withDesktopTopbar,
  withPadding,
  children,
}) {
  return (
    <div>
      {topbar}
      <div
        className={cn(styles.content, {
          [styles.withMobileTopbar]: !!withMobileTopbar,
          [styles.withDesktopTopbar]: !!withDesktopTopbar,
          [styles.withPadding]: !!withPadding,
        })}
      >
        {children}
      </div>
    </div>
  );
}
AppContainer.propTypes = {
  topbar: PropTypes.any,
  children: PropTypes.any,
  withMobileTopbar: PropTypes.bool,
  withDesktopTopbar: PropTypes.bool,
  withPadding: PropTypes.bool,
};
