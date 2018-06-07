export const SET_SIDEBAR_VISIBILITY = '@APP/SIDEBAR/SET_VISIBILITY';

export function showSidebar() {
  return {
    type: SET_SIDEBAR_VISIBILITY,
    visible: true,
  };
}

export function hideSidebar() {
  return {
    type: SET_SIDEBAR_VISIBILITY,
    visible: false,
  };
}
