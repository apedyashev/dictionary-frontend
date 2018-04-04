import {schema} from 'normalizr';
import {resetEntity, getEntityActions, createEntityActions} from 'containers/App/actions';

export const wordsSchema = new schema.Entity('words');
export const wordsArraySchema = new schema.Array(wordsSchema);

export const wordsByDictionaryEntity = ({dictionaryId, wordSetId} = {}) => ({
  key: 'words',
  url: wordSetId
    ? `dictionaries/${dictionaryId}/wordsets/${wordSetId}/words`
    : `dictionaries/${dictionaryId}/words`,
  schema: {items: wordsArraySchema},
});
export function loadWords({dictionaryId, wordSetId}, query, {resolve, reject} = {}) {
  return getEntityActions.request(query, wordsByDictionaryEntity({dictionaryId, wordSetId}), {
    resolve,
    reject,
  });
}

export const translationsSchema = new schema.Entity('translations');
export const translationsArraySchema = new schema.Array(translationsSchema);
export const loadTranslationsEntity = {
  key: 'translations',
  url: 'translate',
  schema: {items: translationsArraySchema},
};

export function loadTranslations({text, direction, uiLang}, {resolve, reject} = {}) {
  return getEntityActions.request({text, direction, uiLang}, loadTranslationsEntity, {
    resolve,
    reject,
    resetStore: true,
  });
}

export const createWordEntity = {
  key: 'words',
  url: 'dictionaries/words',
  schema: {item: wordsSchema},
};
export function createWord(values, {resolve, reject} = {}) {
  return createEntityActions.request(values, createWordEntity, {
    resolve,
    reject,
  });
}

export function resetWords() {
  return resetEntity(wordsByDictionaryEntity().key);
}
