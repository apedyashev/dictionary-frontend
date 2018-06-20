// libs
import React from 'react';
// components
import StandardTopbar from 'containers/StandardTopbar';
import {SettingsForm} from './components';
// other
import styles from './index.css';

export default function SettingsPage() {
  return (
    <div className={styles.root}>
      <StandardTopbar title="Settings" />
      <SettingsForm />
    </div>
  );
}
SettingsPage.propTypes = {};
