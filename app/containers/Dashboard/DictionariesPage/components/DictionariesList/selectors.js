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
    [(state, ownProps) => ownProps.dictionarySlug, makeSelectEntities()],
    (slug, entities) => {
      const dictionary = entities
        .getIn(['dictionaries', 'items'])
        .find((item) => item.get('slug') === slug);
      return dictionary ? dictionary.get('id') : null;
    }
  );
