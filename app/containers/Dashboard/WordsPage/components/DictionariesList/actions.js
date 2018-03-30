import {schema} from 'normalizr';
import {getEntityActions} from 'containers/App/actions';

export const dictionarySchema = new schema.Entity('dictionaries', {
  // wordSets: friendsSchemaArray,
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
