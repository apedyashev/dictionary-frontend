/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  correctAnswerLabel: {
    id: 'containers.TrainWritingCard.correctAnswerLabel',
    defaultMessage: 'correct answer:',
  },
  checkTheMistakeLabel: {
    id: 'containers.TrainWritingCard.checkTheMistakeLabel',
    defaultMessage: "you've made a mistake, please check if it's a typo or an error",
  },
  missingCharactersLabel: {
    id: 'containers.TrainWritingCard.missingCharactersLabel',
    defaultMessage: 'missing charachters',
  },
  redurantCharactersLabel: {
    id: 'containers.TrainWritingCard.redurantCharactersLabel',
    defaultMessage: 'redundant charachters',
  },
  nextButton: {
    id: 'containers.TrainWritingCard.nextButton',
    defaultMessage: 'next',
  },
  itsErrorButton: {
    id: 'containers.TrainWritingCard.itsErrorButton',
    defaultMessage: "it's an error",
  },
  itsTypoButton: {
    id: 'containers.TrainWritingCard.itsTypoButton',
    defaultMessage: "it's a typo",
  },
});
