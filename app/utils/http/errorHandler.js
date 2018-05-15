// import {push} from 'react-router-redux';
import {
  HTTP_STATUS_NOT_AUTHORIZED,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FORBIDDEN,
} from './httpStatusCodes';

// import _ from 'lodash';
// import {actions as userActions} from 'modules/user';
import {setError} from 'containers/Notification/actions';

function getErrorMessage(error) {
  let text = 'Unknown error';
  if (error instanceof Error) {
    text = error.toString();
    if (
      [HTTP_STATUS_UNPROCESSABLE_ENTITY, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_FORBIDDEN].indexOf(
        error.status
      ) >= 0
    ) {
      try {
        const json = JSON.parse(error.response.text);
        text = json && json.message;
      } catch (e) {
        // the 'text' is already set
      }
    }
  } else if (error && error.json && error.json.details && error.json.details.message) {
    text = error.json.message;
  } else if (typeof error === 'string') {
    text = error;
  }
  return text;
}

export function errorHandler(dispatch) {
  return (err) => {
    console.error('errorHandler', err.status, err);
    if (err.status === HTTP_STATUS_NOT_AUTHORIZED) {
      // dispatch(userActions.reset());
      // dispatch(push('/login'));
    } else {
      const errorMessage = getErrorMessage(err);
      console.log('err', errorMessage);
      dispatch(setError(errorMessage));
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
