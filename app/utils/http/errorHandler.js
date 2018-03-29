// import {push} from 'react-router-redux';
import {HTTP_STATUS_NOT_AUTHORIZED, HTTP_STATUS_UNPROCESSABLE_ENTITY} from './httpStatusCodes';

// import _ from 'lodash';
// import {actions as userActions} from 'modules/user';
// import {actions as notificationActions} from 'modules/notifications';

export function errorHandler(dispatch) {
  return (err) => {
    console.error('errorHandler', err.status, err);
    if (err.status === HTTP_STATUS_NOT_AUTHORIZED) {
      // dispatch(userActions.reset());
      // dispatch(push('/login'));
    } else {
      // dispatch(notificationActions.showError(err));
    }

    // UNPROCESSABLE_ENTITY means 'validation error'. Parse JSON reject the promise with error message
    if (err.status === HTTP_STATUS_UNPROCESSABLE_ENTITY) {
      try {
        const {message, validationErrors} = JSON.parse(err.response.text);
        return Promise.reject({message, validationErrors});
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  };
}
