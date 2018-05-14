/*
 *
 * LanguageProvider reducer
 *
 */

import {fromJS} from 'immutable';
import {profileActionTypes, entityActionTypes} from 'containers/App/actions';

import {CHANGE_LOCALE} from './constants';
import {DEFAULT_LOCALE} from 'containers/App/constants';

const initialState = fromJS({
  locale: localStorage.getItem('guestLocale') || DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale);

    case profileActionTypes.GET.SUCCESS: {
      const userId = action.response.result.user;
      const userData = action.response.entities.users[userId];
      if (userData && userData.locale) {
        return state.set('locale', userData.locale);
      }
      return state;
    }

    case entityActionTypes.POST.SUCCESS: {
      const entityKey = action.entity && action.entity.key;
      if (entityKey === 'user') {
        // signin and signup
        const userId = action.response.result.user;
        const userData = action.response.entities.users[userId];
        if (userData && userData.locale) {
          return state.set('locale', userData.locale);
        }
      }
      return state;
    }

    default:
      return state;
  }
}

export default languageProviderReducer;
