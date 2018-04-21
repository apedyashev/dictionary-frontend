import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import _random from 'lodash/random';
import {makeSelectWords} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/selectors';
import {NUM_OF_OPTIONS_IN_CARD} from './constants';

export const makeSelectRandomWords = () =>
  createSelector([makeSelectWords(), (state, ownProps) => ownProps.word], (words, learnedWord) => {
    const filteredWords = words.filter((word) => word.get('id') !== learnedWord.id);
    const numOfWronOpts = NUM_OF_OPTIONS_IN_CARD - 1;
    const wrongOptions = [];
    for (let i = 0; i < numOfWronOpts; i++) {
      const randomWord = filteredWords.get(i);
      if (randomWord) {
        wrongOptions.push(randomWord);
      }
    }

    return fromJS(wrongOptions);
  });
