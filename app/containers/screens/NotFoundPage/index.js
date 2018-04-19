import React from 'react';
import {FormattedMessage} from 'react-intl';
// components
import Prompt from 'components/ui/Prompt';
import messages from './messages';

export default function NotFound() {
  return <Prompt title="404" subtitle={<FormattedMessage {...messages.header} />} />;
}
