// libs
import React from 'react';
// components
import {AppContainer} from 'components';
import StandardTopbar from 'containers/StandardTopbar';
import {FormattedMessage} from 'react-intl';
import {ScheduleList} from './components';
// other
import messages from './messages';
import styles from './index.css';

export default function SchedulePage() {
  return (
    <AppContainer
      topbar={<StandardTopbar title={<FormattedMessage {...messages.topbarTitle} />} />}
      withMobileTopbar
    >
      <div className={styles.content}>
        <ScheduleList />
      </div>
    </AppContainer>
  );
}
SchedulePage.propTypes = {};
