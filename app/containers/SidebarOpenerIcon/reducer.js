import {fromJS} from 'immutable';
import {SET_SIDEBAR_VISIBILITY} from './actions';

const initialState = fromJS({
  visible: false,
});

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_VISIBILITY:
      return state.set('visible', action.visible);

    default:
      return state;
  }
}

export default sidebarReducer;
