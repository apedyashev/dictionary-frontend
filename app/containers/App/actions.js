import {schema} from 'normalizr';
import {action, createRequestTypes} from 'utils/actions';

import {LOAD_PROFILE, LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR} from './constants';

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

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
