// libs
import React from 'react';
// components
import {ScheduleList, Topbar} from './components';
// other
import styles from './index.css';

export default function SchedulePage() {
  return (
    <div className={styles.root}>
      <Topbar />
      <div className={styles.content}>
        <ScheduleList />
      </div>
    </div>
  );
}
SchedulePage.propTypes = {};
