import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

export const makeSelectNotification = () =>
  createSelector(
    (state) => state.get('notification'),
    (notification) => {
      return notification;
    }
  );
