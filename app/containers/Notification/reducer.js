import {fromJS} from 'immutable';
import {SET_NOTIFICATION, RESET_NOTIFICATION} from './actions';

const initialState = fromJS({
  message: null,
  level: null, // info, error, warning
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return state.set('message', action.payload.message).set('level', action.payload.level);

    case RESET_NOTIFICATION:
      return initialState;

    default:
      return state;
  }
}

export default notificationReducer;
