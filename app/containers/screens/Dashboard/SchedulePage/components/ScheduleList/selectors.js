import {createSelector} from 'reselect';
import {makeSelectEntities} from 'containers/App/selectors';

export const makeSelectSchedule = () =>
  createSelector(makeSelectEntities(), (entities) => {
    return entities.getIn(['schedule', 'displayOrder']).map((id) => {
      return entities.getIn(['schedule', 'items', id]);
    });
  });
// TODO: create universal selector for selecting hasNextPage from given module
export const makeSelectScheduleHasNextPage = () =>
  createSelector(makeSelectEntities(), (entities) => {
    const curPage = entities.getIn(['schedule', 'pagination', 'page']);
    const totalPages = entities.getIn(['schedule', 'pagination', 'pages']);
    // total pages always is >= 1, otherwise it hasn't been loaded yet so TRUE will be returned
    if (!totalPages) {
      return true;
    }
    return curPage < totalPages;
  });
