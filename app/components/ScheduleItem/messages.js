/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  reviewWordsRemainder: {
    id: 'containers.ScheduleItem.reviewWordsRemainder',
    defaultMessage: `
    {wordsCount , plural,
      one {{wordsCount} word}
      other {{wordsCount} words}
    } to be reviewed
    `,
  },
  learnAgainLink: {
    id: 'containers.ScheduleItem.learnAgainLink',
    defaultMessage: 'learn again',
  },
});
