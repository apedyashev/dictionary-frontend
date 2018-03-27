/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {fromJS} from 'immutable';

import {LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR} from './constants';
import {profileActionTypes} from './actions';

// The initial state of the App
const initialState = fromJS({
  profile: {
    loading: false,
    authHeader:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmEzZDg2OTVlYmI1MDAyNmJmNzI2OCIsImlhdCI6MTUyMjE1NDg4Nn0.PcSyTCxNua8KR0JzfC3vNXaoMA94iPX-GWXKccfhxQ0',
    data: {},
  },

  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case profileActionTypes.GET.REQUEST:
      return state.setIn(['profile', 'loading'], true);

    case profileActionTypes.GET.SUCCESS:
      const userId = action.response.result.user;
      return state
        .setIn(['profile', 'loading'], false)
        .setIn(['profile', 'data'], action.response.entities.users[userId]);

    case profileActionTypes.GET.FAILURE:
      return state.setIn(['profile', 'loading'], false);

    case LOAD_REPOS:
      return (
        state
          // .set('loading', true)
          .set('error', false)
          .setIn(['userData', 'repositories'], false)
      );
    case LOAD_REPOS_SUCCESS:
      return (
        state
          .setIn(['userData', 'repositories'], action.repos)
          // .set('loading', false)
          .set('currentUser', action.username)
      );
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error);
    // .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
