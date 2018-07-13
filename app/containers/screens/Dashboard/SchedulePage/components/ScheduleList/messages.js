/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  dataLoadingMessage: {
    id: 'containers.ScheduleList.dataLoadingMessage',
    defaultMessage: 'Loading the schedule',
  },
  noRowsMessage: {
    id: 'containers.ScheduleList.noRowsMessage',
    defaultMessage: 'Your schedule is empty',
  },
});
