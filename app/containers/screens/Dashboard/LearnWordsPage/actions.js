import {getEntityActions} from 'containers/App/actions';
import {wordsArraySchema} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/actions';

export const SEND_FOR_LEARNING = '@LEARN_WORDS/SEND_FOR_LEARNING';

export function sendWordsForLearning(wordIds) {
  return {
    type: SEND_FOR_LEARNING,
    wordIds,
  };
}

export const loadRandomWordsEntity = (dictionaryId) => ({
  key: 'words',
  url: `dictionaries/${dictionaryId}/words/random`,
  schema: {items: wordsArraySchema},
});
export function loadRandomWords(
  dictionaryId,
  {excludeWords, onlyForLearning, ...query},
  {resolve, reject} = {}
) {
  return getEntityActions.request(
    {excludeWords, onlyForLearning, ...query},
    loadRandomWordsEntity(dictionaryId),
    {
      resolve,
      reject,
    }
  );
}
