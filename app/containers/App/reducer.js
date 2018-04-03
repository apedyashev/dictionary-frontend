import _each from 'lodash/each';
import {fromJS} from 'immutable';

import {LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR} from './constants';
import {profileActionTypes, entityActionTypes, SET_TOKEN, RESET_ENTITY} from './actions';

function getEntityIds(action) {
  let ids = [];
  if (action.response && action.response.result) {
    const {result} = action.response;
    if (result.items) {
      ids = result.items;
    } else if (result.item) {
      ids = [result.item];
    }
  }
  return ids;
}

const defaultEntityState = fromJS({
  loading: false,
  loaded: false,
  items: {},
  displayOrder: [],
  pagination: {},
});
// The initial state of the App
const initialState = fromJS({
  profile: {
    loading: false,
    loaded: false,
    authHeader: '',
    data: {},
  },
  entities: {
    dictionaries: defaultEntityState,
    words: defaultEntityState,
    wordSets: defaultEntityState,
    translateDirections: defaultEntityState,
  },

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

    case RESET_ENTITY: {
      return state.setIn(['entities', action.entityName], defaultEntityState);
    }

    case entityActionTypes.POST.SUCCESS: {
      const userId = action.response.result.user;
      const entityKey = action.entity && action.entity.key;
      if (entityKey === 'user') {
        return state
          .setIn(['profile', 'data'], action.response.entities.users[userId])
          .setIn(['profile', 'authHeader'], `Bearer ${action.response.result.token}`);
      } else if (entityKey) {
        const ids = getEntityIds(action);
        return state
          .mergeDeepIn(['entities', entityKey, 'items'], action.response.entities[entityKey])
          .mergeIn(['entities', entityKey, 'displayOrder'], ids);
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
      const entityKey = action.entity && action.entity.key;
      const ids = getEntityIds(action);

      let newState = state;
      _each(action.response.entities, (data, key) => {
        newState = newState.mergeDeepIn(['entities', key, 'items'], data);
      });
      if (action.response.result.pagination) {
        newState = newState.mergeIn(
          ['entities', entityKey, 'pagination'],
          action.response.result.pagination
        );
      }
      return newState
        .setIn(['entities', entityKey, 'loading'], false)
        .setIn(['entities', entityKey, 'loaded'], true)
        .mergeIn(['entities', entityKey, 'displayOrder'], ids);
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
