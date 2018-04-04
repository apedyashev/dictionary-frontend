// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// selectors
import {makeSelectDictionaryWordSets} from '../DictionariesList/selectors';
// components
import {Dropdown} from 'components/ui';

function WordSetSelector({value, onChange, wordSets}) {
  const options = wordSets
    .map((wordSet) => ({
      key: wordSet.get('id'),
      text: wordSet.get('title'),
      value: wordSet.get('id'),
    }))
    .toJS();
  // push 'all words' to the beginning
  options.unshift({key: 0, text: 'All words', value: 0});

  return <Dropdown value={value} options={options} onChange={onChange} />;
}
WordSetSelector.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
};
WordSetSelector.defaultProps = {
  value: 0,
};

const mapStateToProps = createStructuredSelector({
  wordSets: makeSelectDictionaryWordSets(),
});

export default connect(mapStateToProps, null)(WordSetSelector);