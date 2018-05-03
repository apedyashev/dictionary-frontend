/**
 * The global state selectors
 */
import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

// const makeSelectCurrentUser = () =>
//   createSelector(selectGlobal, (globalState) => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

// const makeSelectError = () =>
//   createSelector(selectGlobal, (globalState) => globalState.get('error'));
//
// const makeSelectRepos = () =>
//   createSelector(selectGlobal, (globalState) => globalState.getIn(['userData', 'repositories']));

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.get('location').toJS());

const makeSelectIsLoginRoute = () =>
  createSelector(
    selectRoute,
    (routeState) => routeState.getIn(['location', 'pathname']) === '/login'
  );

const makeSelectProfileLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loading']));
const makeSelectProfileLoaded = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loaded']));
const makeSelectProfileData = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'data']));

const makeSelectEntities = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('entities'));
//
// export const makeSelectEntityProps = (path, useDisplayOrder = true) => {
//   if (path[path.length - 1] === 'items' && useDisplayOrder) {
//     return createSelector(selectGlobal, (globalState) => {
//       const displayOrderPath = [...path];
//       displayOrderPath[path.length - 1] = 'displayOrder';
//       return globalState.getIn(displayOrderPath).map((id) => {
//         return globalState.getIn([...path, id]);
//       });
//     });
//   }
//   console.log('path', path);
//   return createSelector(selectGlobal, (globalState) => globalState.getIn(path));
// };

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectIsLoginRoute,
  makeSelectProfileLoading,
  makeSelectProfileLoaded,
  makeSelectProfileData,
  makeSelectEntities,
};
