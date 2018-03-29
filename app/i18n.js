/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import {addLocaleData} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';
import ruLocaleData from 'react-intl/locale-data/ru';
import rsLocaleData from 'react-intl/locale-data/sr';

import {DEFAULT_LOCALE} from '../app/containers/App/constants';

import enTranslationMessages from './translations/en-US.json';
import deTranslationMessages from './translations/de-CH.json';
import ruTranslationMessages from './translations/ru-RU.json';
import rsTranslationMessages from './translations/sr-SP.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(ruLocaleData);
addLocaleData(rsLocaleData);

export const appLocales = ['en-US', 'de-CH', 'ru-RU', 'sr-SP'];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, {[key]: formattedMessage});
  }, {});
};

export const translationMessages = {
  'en-US': formatTranslationMessages('en-US', enTranslationMessages),
  'de-CH': formatTranslationMessages('de-CH', deTranslationMessages),
  'ru-RU': formatTranslationMessages('ru-RU', ruTranslationMessages),
  'sr-SP': formatTranslationMessages('sr-SP', rsTranslationMessages),
};
