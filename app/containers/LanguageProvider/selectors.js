import {createSelector} from 'reselect';

const selectLanguage = (state) => state.get('language');
export const makeSelectLocale = () =>
  createSelector(selectLanguage, (languageState) => languageState.get('locale'));
