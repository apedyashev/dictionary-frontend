/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  dataLoadingMessage: {
    id: 'containers.WordsList.dataLoadingMessage',
    defaultMessage: 'Loading words',
  },
  noRowsMessage: {
    id: 'containers.WordsList.noRowsMessage',
    defaultMessage: "You don't have any words in the dictionary",
  },
  learnedLabelText: {
    id: 'containers.WordsList.learnedLabelText',
    defaultMessage: 'learned',
  },
});
