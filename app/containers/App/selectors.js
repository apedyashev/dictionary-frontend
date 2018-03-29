/**
 * The global state selectors
 */

import {createSelector} from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['userData', 'repositories']));

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.get('location').toJS());

const makeSelectIsLoginRoute = () =>
  createSelector(
    selectRoute,
    (routeState) => routeState.getIn(['location', 'pathname']) === '/login'
  );

const makeSelectProfileLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'loading']));
const makeSelectProfileData = () =>
  createSelector(selectGlobal, (globalState) => globalState.getIn(['profile', 'data']));

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectIsLoginRoute,
  makeSelectProfileLoading,
  makeSelectProfileData,
};
