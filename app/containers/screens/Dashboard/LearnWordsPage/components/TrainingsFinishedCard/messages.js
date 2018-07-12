/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  resultZeroWordsLearned: {
    id: 'containers.TrainingsFinishedCard.resultZeroWordsLearned',
    defaultMessage: "Dont't be upset!",
  },
  resultAllWordsLearned: {
    id: 'containers.TrainingsFinishedCard.resultAllWordsLearned',
    defaultMessage: 'It was impressive!',
  },
  resultMoreThanHalfWordsLearned: {
    id: 'containers.TrainingsFinishedCard.resultMoreThanHalfWordsLearned',
    defaultMessage: 'Well done!',
  },
  resultLessThanHalfWordsLearned: {
    id: 'containers.TrainingsFinishedCard.resultLessThanHalfWordsLearned',
    defaultMessage: 'Try to do your best next time!',
  },
  learnedWordsInfoMsg: {
    id: 'containers.TrainingsFinishedCard.learnedWordsInfoMsg',
    defaultMessage: 'You learned {wordsLearned} words out of {totalWords}',
  },
  learnNextWordsBtn: {
    id: 'containers.TrainingsFinishedCard.learnNextWordsBtn',
    defaultMessage: 'Learn next words',
  },
  backToDictBtn: {
    id: 'containers.TrainingsFinishedCard.backToDictBtn',
    defaultMessage: 'Back to the dictionary',
  },
});
