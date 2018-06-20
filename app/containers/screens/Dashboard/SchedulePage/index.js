// libs
import React from 'react';
// components
import StandardTopbar from 'containers/StandardTopbar';
import {ScheduleList} from './components';
// other
import styles from './index.css';

export default function SchedulePage() {
  return (
    <div className={styles.root}>
      <StandardTopbar title="Upcomming events" />
      <div className={styles.content}>
        <ScheduleList />
      </div>
    </div>
  );
}
SchedulePage.propTypes = {};
