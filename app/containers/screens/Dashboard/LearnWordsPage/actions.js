import {getEntityActions, patchEntityActions} from 'containers/App/actions';
import {
  wordsSchema,
  wordsArraySchema,
} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/actions';

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

export const loadScheduledWordsEntity = (dictionaryId, date) => ({
  key: 'words',
  url: `dictionaries/${dictionaryId}/words/scheduled/${date}/random`,
  schema: {items: wordsArraySchema},
});
export function loadScheduledWords(dictionaryId, date, query, {resolve, reject} = {}) {
  return getEntityActions.request(query, loadScheduledWordsEntity(dictionaryId, date), {
    resolve,
    reject,
  });
}

export const submitLearnedWordsEntity = {
  key: 'words',
  url: 'dictionaries/words/learned',
  schema: {items: wordsArraySchema},
};
export function submitLearnedWords(learnedStatuses = [], {resolve, reject} = {}) {
  return patchEntityActions.request({learnedStatuses}, submitLearnedWordsEntity, {
    resolve,
    reject,
  });
}

export const changeWordImageEntity = (wordId) => ({
  key: 'words',
  url: `dictionaries/words/${wordId}/image`,
  schema: {item: wordsSchema},
});
export function changeWordImage(wordId, {resolve, reject} = {}) {
  return patchEntityActions.request({}, changeWordImageEntity(wordId), {
    resolve,
    reject,
  });
}
