import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectWords = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const wordSets = entities.getIn(['wordSets', 'items']);
    return entities.getIn(['words', 'displayOrder']).map((id) => {
      const word = entities.getIn(['words', 'items', id]);
      const wordSetId = word.get('wordSet');
      const wordSet = wordSets.get(wordSetId) || fromJS({});
      return word.set('wordSet', wordSet);
    });
  });
export const makeSelectWordsHasNextPage = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const curPage = entities.getIn(['words', 'pagination', 'page']);
    const totalPages = entities.getIn(['words', 'pagination', 'pages']);
    // console.log('***', entities.getIn(['words']).toJS());
    // console.log('curPage < totalPages', curPage, totalPages, curPage < totalPages);
    // total pages always is >= 1, otherwise it hasn't been loaded yet so TRUE will be returned
    if (!totalPages) {
      return true;
    }

    return curPage < totalPages;
  });

export const makeSelectWordLoadingStatus = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['words', 'pending']);
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
