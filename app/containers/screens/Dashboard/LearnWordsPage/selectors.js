import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import _range from 'lodash/range';
import _shuffle from 'lodash/shuffle';
import {makeSelectWords} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/selectors';
import {makeSelectEntities} from 'containers/App/selectors';
import {NUM_OF_OPTIONS_IN_CARD} from './constants';

// returns random words
export const makeSelectRandomWords = () =>
  createSelector([makeSelectWords(), (state, ownProps) => ownProps.word], (words, learnedWord) => {
    const filteredWords = words.filter((word) => word.get('id') !== learnedWord.get('id'));
    const indexes = _range(filteredWords.size);
    // -1 because we need one more option that is correct answer
    const numOfWrongOpts = NUM_OF_OPTIONS_IN_CARD - 1;
    const wrongOptions = _shuffle(indexes)
      .slice(0, Math.min(numOfWrongOpts, filteredWords.size))
      .map((index) => filteredWords.get(index));

    return fromJS(wrongOptions);
  });

export const makeSelectLearnedWords = () =>
  createSelector(
    [
      (state) => state.getIn(['learnWords', 'ids']),
      (state) => state.getIn(['global', 'entities', 'words', 'items']),
    ],
    (learnedWordIds, allWords) => {
      return fromJS(learnedWordIds.map((id) => allWords.get(id)));
    }
  );

export const makeSelectScheduledDate = () =>
  createSelector([(state, ownProps) => ownProps.match.params.scheduledDate], (scheduledDate) => {
    if (!scheduledDate) {
      // undefined means that route is /learn-words/:slug
      return undefined;
    }
    if (/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(scheduledDate)) {
      return scheduledDate;
    }
    return null;
  });

export const makeSelectWordsLoading = () =>
  createSelector([makeSelectEntities()], (entities) => {
    return entities.getIn(['words', 'loading']);
  });

export const makeSelectWordsLoadingDone = () =>
  createSelector([makeSelectEntities()], (entities) => {
    return entities.getIn(['words', 'loaded']);
  });
