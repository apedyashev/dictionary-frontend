import _each from 'lodash/each';
import _without from 'lodash/without';
import _uniq from 'lodash/uniq';
import {fromJS} from 'immutable';
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
    translations: defaultEntityState,
    schedule: defaultEntityState,
    countries: defaultEntityState,
  },

  // error: false,
  // currentUser: false,
  // userData: {
  //   repositories: false,
  // },
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
        if (entityKey === 'wordSets') {
          const {dictionaryId} = action.meta;
          console.log('dictionaryId', dictionaryId);
          const wordSetIds = state
            .getIn(['entities', 'dictionaries', 'items', dictionaryId, 'wordSets'])
            .concat(fromJS(ids));
          // eslint-disable-next-line no-param-reassign
          state = state.setIn(
            ['entities', 'dictionaries', 'items', dictionaryId, 'wordSets'],
            wordSetIds
          );
        }

        // TODO: not sure if it's a best way to concat/merge Lists
        // (mergeIn replaces it instead of concat)
        const displayOrder = state
          .getIn(['entities', entityKey, 'displayOrder'])
          .concat(fromJS(ids));

        return state
          .mergeDeepIn(['entities', entityKey, 'items'], action.response.entities[entityKey])
          .setIn(['entities', entityKey, 'displayOrder'], fromJS(_uniq(displayOrder.toJS())));
      }
      return state;
    }

    case entityActionTypes.PATCH.SUCCESS: {
      const entityKey = action.entity && action.entity.key;
      return state.mergeDeepIn(
        ['entities', entityKey, 'items'],
        action.response.entities[entityKey]
      );
    }

    case profileActionTypes.GET.FAILURE:
      return state.setIn(['profile', 'loading'], false).setIn(['profile', 'loaded'], true);

    case entityActionTypes.GET.REQUEST: {
      const entityKey = action.entity && action.entity.key;
      if (action.meta && action.meta.resetStore) {
        return state
          .setIn(['entities', entityKey], defaultEntityState)
          .setIn(['entities', entityKey, 'loading'], true);
      }
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

      // TODO: not sure if it's a best way to concat/merge Lists
      // (mergeIn replaces it instead of concat)
      const displayOrder = newState
        .getIn(['entities', entityKey, 'displayOrder'])
        .concat(fromJS(ids));
      return newState
        .setIn(['entities', entityKey, 'loading'], false)
        .setIn(['entities', entityKey, 'loaded'], true)
        .setIn(['entities', entityKey, 'displayOrder'], fromJS(_uniq(displayOrder.toJS())));
    }

    case entityActionTypes.GET.FAILURE: {
      const entityKey = action.entity && action.entity.key;
      return state
        .setIn(['entities', entityKey, 'loading'], false)
        .setIn(['entities', entityKey, 'loaded'], true);
    }

    case entityActionTypes.DELETE_BATCH.SUCCESS: {
      const entityKey = action.entity && action.entity.key;
      const oldDisplayOrder = state.getIn(['entities', entityKey, 'displayOrder']).toJS();
      const {items} = action.response;
      const displayOrder = fromJS(_without(oldDisplayOrder, ...items));
      return state.setIn(['entities', entityKey, 'displayOrder'], displayOrder);
    }

    default:
      return state;
  }
}

export default appReducer;
