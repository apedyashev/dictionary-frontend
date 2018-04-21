// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components

export default function FormatWordDefinitions({word}) {
  return word.translations.map((def) => def.text).join(', ');
}
FormatWordDefinitions.propTypes = {
  word: PropTypes.shape({
    // TODO: definitions
    translations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
