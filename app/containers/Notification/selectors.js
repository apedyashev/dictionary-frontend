import {createSelector} from 'reselect';

export const makeSelectNotification = () =>
  createSelector(
    (state) => state.get('notification'),
    (notification) => {
      return notification;
    }
  );
