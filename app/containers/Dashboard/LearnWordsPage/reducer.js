import {fromJS} from 'immutable';

import {SEND_FOR_LEARNING} from './actions';

// The initial state of the App
const initialState = fromJS({
  ids: [],
});

function learnWordsReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_FOR_LEARNING:
      return state.set('ids', action.wordIds);
    default:
      return state;
  }
}

export default learnWordsReducer;
