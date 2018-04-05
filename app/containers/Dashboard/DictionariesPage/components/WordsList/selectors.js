import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectWords = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['words', 'displayOrder']).map((id) => {
      return entities.getIn(['words', 'items', id]);
    });
  });
export const makeSelectWordsHasNextPage = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const curPage = entities.getIn(['words', 'pagination', 'page']);
    const totalPages = entities.getIn(['words', 'pagination', 'pages']);
    // total pages always is >= 1, otherwise it hasn't been loaded yet so TRUE will be returned
    if (!totalPages) {
      return true;
    }
    return curPage < totalPages;
  });

export const makeSelectWordToBeEdited = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const wordIds = entities.getIn(['words', 'displayOrder']).toJS();
    if (wordIds && wordIds.length === 1) {
      return entities.getIn(['words', 'items', wordIds[0]]);
    }
    return null;
  });

// TODO: move to another module/component
export const makeSelectTranslations = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['translations', 'items']);
  });
export const makeSelectTranslationsLoading = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['translations', 'loading']);
  });
