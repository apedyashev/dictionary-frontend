/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import {defineMessages} from 'react-intl';

export default defineMessages({
  titleLabel: {
    id: 'containers.NewDictForm.emailLabel',
    defaultMessage: 'Title',
  },
  titleHint: {
    id: 'containers.NewDictForm.emailHint',
    defaultMessage: 'Please enter the dictionary title',
  },
  translateDirectionLabel: {
    id: 'containers.NewDictForm.translateDirectionLabel',
    defaultMessage: 'Translate direction',
  },
  translateDirectionHint: {
    id: 'containers.NewDictForm.translateDirectionHint',
    defaultMessage: 'Please select languages',
  },
  saveBtnLabel: {
    id: 'containers.NewDictForm.saveBtnLabel',
    defaultMessage: 'Save',
  },
  translationPossibleCheckboxLabel: {
    id: 'containers.NewDictForm.translationPossibleCheckboxLabel',
    defaultMessage: 'I cannot find my language in the list',
  },
  helptextTranslationPossible: {
    id: 'containers.NewDictForm.helptextTranslationPossible',
    defaultMessage:
      "If your language is available in the list, then we'll be translating your words for you",
  },

  helptextTranslationIsntPossible: {
    id: 'containers.NewDictForm.helptextTranslationIsntPossible',
    defaultMessage:
      "No worries! You still can add and learn words but you'll have to translate them on your own",
  },
});
