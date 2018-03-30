import {createSelector} from 'reselect';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectDictionaries = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['dictionaries', 'items']);
  });
