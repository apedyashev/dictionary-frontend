// libs
import React from 'react';
// components
import ScheduleList from './components/ScheduleList';
// other
import styles from './index.css';

export default function SchedulePage() {
  return (
    <div className={styles.root}>
      <ScheduleList />
    </div>
  );
}
SchedulePage.propTypes = {};
