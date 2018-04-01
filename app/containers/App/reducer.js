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
import {profileActionTypes, entityActionTypes, SET_TOKEN} from './actions';

// The initial state of the App
const initialState = fromJS({
  profile: {
    loading: false,
    loaded: false,
    authHeader: '',
    data: {},
  },
  entities: {},

  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      console.log('set token', action.token);
      return state.setIn(['profile', 'authHeader'], `Bearer ${action.token}`);

    case profileActionTypes.GET.REQUEST:
      return state.setIn(['profile', 'loading'], true);

    case profileActionTypes.GET.SUCCESS: {
      const userId = action.response.result.user;
      return state
        .setIn(['profile', 'loading'], false)
        .setIn(['profile', 'loaded'], true)
        .setIn(['profile', 'data'], action.response.entities.users[userId]);
    }

    case entityActionTypes.POST.SUCCESS: {
      const userId = action.response.result.user;
      const entityKey = action.entity && action.entity.key;
      if (entityKey === 'user') {
        return state
          .setIn(['profile', 'data'], action.response.entities.users[userId])
          .setIn(['profile', 'authHeader'], `Bearer ${action.response.result.token}`);
      } else if (entityKey) {
        return state.mergeDeepIn(
          ['entities', entityKey, 'items'],
          action.response.entities[entityKey]
        );
        // return state.setIn(['entities', entityKey, 'items'], action.response.entities[entityKey]);
      }
      return state;
    }

    case profileActionTypes.GET.FAILURE:
      return state.setIn(['profile', 'loading'], false).setIn(['profile', 'loaded'], true);

    case entityActionTypes.GET.REQUEST: {
      const entityKey = action.entity && action.entity.key;
      return state
        .setIn(['entities', entityKey, 'loading'], true)
        .setIn(['entities', entityKey, 'loaded'], false);
    }

    case entityActionTypes.GET.SUCCESS: {
      // console.log('action.response.entities', action.response.entities);
      const entityKey = action.entity && action.entity.key;
      let newState = state;
      _.each(action.response.entities, (data, key) => {
        newState = state.mergeDeepIn(['entities', key, 'items'], data);
      });
      return newState
        .setIn(['entities', entityKey, 'loading'], false)
        .setIn(['entities', entityKey, 'loaded'], true);
      // .mergeDeepIn(['entities', entityKey, 'items'], action.response.entities);
    }

    case entityActionTypes.GET.FAILURE: {
      const entityKey = action.entity && action.entity.key;
      return state
        .setIn(['entities', entityKey, 'loading'], false)
        .setIn(['entities', entityKey, 'loaded'], true);
    }

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
