import {schema} from 'normalizr';
import {getEntityActions} from 'containers/App/actions';

export const wordsSchema = new schema.Entity('words');
export const wordsArraySchema = new schema.Array(wordsSchema);

export const wordsByDictionaryEntity = (id) => ({
  key: 'words',
  url: `dictionaries/${id}/words`,
  schema: {items: wordsArraySchema},
});
export function loadWords({dictionaryId}, query, {resolve, reject} = {}) {
  return getEntityActions.request(query, wordsByDictionaryEntity(dictionaryId), {resolve, reject});
}
