// libs
import React from 'react';
// components
import {AppContainer} from 'components';
import StandardTopbar from 'containers/StandardTopbar';
import {FormattedMessage} from 'react-intl';
import {SettingsForm} from './components';
// other
import messages from './messages';

export default function SettingsPage() {
  return (
    <AppContainer
      topbar={<StandardTopbar title={<FormattedMessage {...messages.topbarTitle} />} />}
      withMobileTopbar
      withPadding
    >
      <SettingsForm />
    </AppContainer>
  );
}
SettingsPage.propTypes = {};
