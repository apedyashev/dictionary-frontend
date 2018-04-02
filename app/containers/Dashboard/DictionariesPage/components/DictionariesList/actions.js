import {schema} from 'normalizr';
import {getEntityActions, createEntityActions} from 'containers/App/actions';

export const wordSetSchema = new schema.Entity('wordSets');
export const wodrSetsArraySchema = new schema.Array(wordSetSchema);
export const dictionarySchema = new schema.Entity('dictionaries', {
  wordSets: wodrSetsArraySchema,
});
export const dictionariesArraySchema = new schema.Array(dictionarySchema);

export const dictionariesEntity = {
  key: 'dictionaries',
  url: 'dictionaries',
  schema: {items: dictionariesArraySchema},
};
export function loadDictionaries(query, {resolve, reject} = {}) {
  return getEntityActions.request(query, dictionariesEntity, {resolve, reject});
}

export const translateDirectionSchema = new schema.Entity(
  'translateDirections',
  {},
  {idAttribute: 'codes'}
);
export const translateDirectionArraySchema = new schema.Array(translateDirectionSchema);
export const translateDirections = {
  key: 'translateDirections',
  url: 'translate/directions',
  schema: {items: translateDirectionArraySchema},
};
export function loadTranslateDirections() {
  return getEntityActions.request({}, translateDirections);
}

export const createDictionaryEntity = {
  key: 'dictionaries',
  url: 'dictionaries',
  schema: {item: dictionarySchema},
};
export function createDictionary(values, {resolve, reject}) {
  return createEntityActions.request(values, createDictionaryEntity, {resolve, reject});
}
