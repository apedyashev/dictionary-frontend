import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectDictionaries = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['dictionaries', 'items']);
  });
export const makeSelectDictionariesLoading = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['dictionaries', 'loading']);
  });
export const makeSelectDictionariesLoaded = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['dictionaries', 'loaded']);
  });

export const makeSelectTranslationDirections = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const items = entities.getIn(['translateDirections', 'items']);
    if (!items) {
      return fromJS([]);
    }
    return items.map((item) => {
      return {
        key: item.get('codes'),
        value: item.get('codes'),
        text: item.get('names'),
      };
    });
  });

export const makeSelectDictionarIdBySlug = () =>
  createSelector(
    [(state, ownProps) => ownProps.match.params.slug, makeSelectEntities()],
    (slug, entities) => {
      const dictionary = entities
        .getIn(['dictionaries', 'items'])
        .find((item) => item.get('slug') === slug);
      return dictionary ? dictionary.get('id') : null;
    }
  );

export const makeSelectTranslateDirection = () =>
  createSelector(
    [(state, ownProps) => ownProps.match.params.slug, makeSelectEntities()],
    (slug, entities) => {
      const dictionary = entities
        .getIn(['dictionaries', 'items'])
        .find((item) => item.get('slug') === slug);
      return dictionary ? dictionary.get('translateDirection') : null;
    }
  );

export const makeSelectDictionaryWordSets = () =>
  createSelector(
    [(state, ownProps) => ownProps.dictionaryId, makeSelectEntities()],
    (dictionaryId, entities) => {
      const dictionary = entities.getIn(['dictionaries', 'items', dictionaryId]);
      const wordSetIds = dictionary ? dictionary.get('wordSets') : fromJS([]);
      return wordSetIds.map((wordSetId) => {
        return entities.getIn(['wordSets', 'items', wordSetId]);
      });
    }
  );
