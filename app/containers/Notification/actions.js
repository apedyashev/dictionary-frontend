export const SET_NOTIFICATION = '@APP/SET_NOTIFICATION';
export const RESET_NOTIFICATION = '@APP/RESET_NOTIFICATION';

export function setNotification(message, level = 'info') {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      level,
    },
  };
}

export function setError(message) {
  return setNotification(message, 'error');
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}
