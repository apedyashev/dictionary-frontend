import {createSelector} from 'reselect';
// import {fromJS} from 'immutable';

export const makeSelectSidebarVisible = () =>
  createSelector(
    (state) => state.get('sidebar'),
    // sidebar modules is injected only when in mobile mode. For desctop visibility is always true
    // (sidebar) => (sidebar ? sidebar.get('visible') : true)
    (sidebar) => sidebar && sidebar.get('visible')
  );
