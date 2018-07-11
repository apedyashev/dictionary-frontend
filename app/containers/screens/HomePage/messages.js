/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  introHeader: {
    id: 'containers.HomePage.intro.header',
    defaultMessage: 'Change the way you learn words!',
  },
  introDescription: {
    id: 'containers.HomePage.intro.description',
    defaultMessage: 'Learn them in the most efficient way with spaced repetition technique!',
  },
  techniqueDescription: {
    id: 'containers.HomePage.technique.description',
    defaultMessage:
      'Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material in order to exploit the psychological spacing effect.',
  },
});
