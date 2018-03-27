import {HTTP_STATUS_NOT_AUTHORIZED, HTTP_STATUS_UNPROCESSABLE_ENTITY} from './httpStatusCodes.js';
// import {push} from 'react-router-redux';
// import _ from 'lodash';
// import {actions as userActions} from 'modules/user';
// import {actions as notificationActions} from 'modules/notifications';

export function errorHandler(dispatch) {
  return (err) => {
    console.error('errorHandler', err.status, err);
    if (err.status === HTTP_STATUS_NOT_AUTHORIZED) {
      // dispatch(userActions.reset());
      // dispatch(push('/signin'));
    } else {
      // dispatch(notificationActions.showError(err));
    }

    // UNPROCESSABLE_ENTITY means 'validation error'. Parse JSON reject the promise with error message
    if (err.status === HTTP_STATUS_UNPROCESSABLE_ENTITY) {
      // const json = JSON.parse(err.response.text);
      // const message = json.details && json.details.message;
      // const validationErrorsFlat = _.mapValues(json.details.errors, (error) => error.join(','));
      // return Promise.reject({message, validation: validationErrorsFlat});
    }
    return Promise.reject(err);
  };
}
