import {schema} from 'normalizr';
import {action, createRequestTypes} from 'utils/actions';

export const SET_TOKEN = '@APP/SET_TOKEN';
export const RESET_ENTITY = '@APP/RESET_ENTITY';
export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export const profileActionTypes = {
  GET: createRequestTypes('PROFILE/GET'),
};

export const userSchema = new schema.Entity('users', {
  // friends: friendsSchemaArray,
});

export const loadProfileActions = {
  request: () => action(profileActionTypes.GET.REQUEST, {schema: {user: userSchema}}),
  success: (response) => action(profileActionTypes.GET.SUCCESS, response),
  failure: (error) => action(profileActionTypes.GET.FAILURE, {error}),
};

export function resetEntity(entityName) {
  return {
    type: RESET_ENTITY,
    entityName,
  };
}
export const entityActionTypes = {
  GET: createRequestTypes('ENTITY/GET'),
  POST: createRequestTypes('ENTITY/CREATE'),
  PATCH: createRequestTypes('ENTITY/UPDATE'),
  DELETE_BATCH: createRequestTypes('ENTITY/DELETE_BATCH'),
};
export const createEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.POST.REQUEST, {payload, entity, meta}),
  success: (response, entity, meta) =>
    action(entityActionTypes.POST.SUCCESS, {...response, entity, meta}),
  failure: (error, entity) => action(entityActionTypes.POST.FAILURE, {error, entity}),
};
export const getEntityActions = {
  request: (query, entity, meta) => action(entityActionTypes.GET.REQUEST, {entity, query, meta}),
  success: (response, entity) => action(entityActionTypes.GET.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.GET.FAILURE, {error, entity}),
};
export const patchEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.PATCH.REQUEST, {payload, entity, meta}),
  success: (response, entity) => action(entityActionTypes.PATCH.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.PATCH.FAILURE, {error, entity}),
};
export const deleteEntityActions = {
  request: (payload, entity, meta) =>
    action(entityActionTypes.DELETE_BATCH.REQUEST, {payload, entity, meta}),
  success: (response, entity) =>
    action(entityActionTypes.DELETE_BATCH.SUCCESS, {...response, entity}),
  failure: (error, entity) => action(entityActionTypes.DELETE_BATCH.FAILURE, {error, entity}),
};

export const newUserEntity = {
  key: 'user',
  url: 'auth/register',
  schema: {user: userSchema},
};

export const loginUserEntity = {
  key: 'user',
  url: 'auth/login',
  schema: {user: userSchema},
};
export function loginUser(values, {resolve, reject}) {
  return createEntityActions.request(values, loginUserEntity, {resolve, reject});
}

export const loginFbUserEntity = {
  key: 'user',
  url: 'auth/facebook/callback',
  schema: {user: userSchema},
};
export function loginFbUser(code, {resolve, reject}) {
  return createEntityActions.request({}, loginFbUserEntity, {query: {code}, resolve, reject});
}
