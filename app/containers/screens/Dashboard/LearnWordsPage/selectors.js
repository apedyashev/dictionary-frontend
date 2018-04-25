import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import _range from 'lodash/range';
import _shuffle from 'lodash/shuffle';
import {makeSelectWords} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/selectors';
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
