import {createSelector} from 'reselect';
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
export const makeSelectDictionarySlug = () =>
  createSelector((state, ownProps) => {
    console.log('ownProps', ownProps.params);
    return ownProps.params.slug;
  }, (slug) => slug);
