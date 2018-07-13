// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// other
import styles from './index.css';

export default function AppContainer({topbar, withMobileTopbar, withDesktopTopbar, children}) {
  return (
    <div>
      {topbar}

      <div
        className={cn(styles.content, {
          [styles.withMobileTopbar]: !!withMobileTopbar,
          [styles.withDesktopTopbar]: !!withDesktopTopbar,
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
};
