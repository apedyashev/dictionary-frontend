/**
 * The global state selectors
 */
import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

export const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.get('location').toJS());
export const makeSelectLocationPath = () =>
  createSelector(selectRoute, (routeState) => routeState.getIn(['location', 'pathname']));

const makeSelectIsLoginRoute = () =>
  createSelector(
    selectRoute,
    (routeState) => routeState.getIn(['location', 'pathname']) === '/login'
  );

export const makeSelectProfileLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loading']));
export const makeSelectProfileLoaded = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loaded']));
export const makeSelectProfileData = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'data']));
export const makeSelectLoggingOut = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loggingOut']));

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

export {selectGlobal, makeSelectLoading, makeSelectIsLoginRoute, makeSelectEntities};
