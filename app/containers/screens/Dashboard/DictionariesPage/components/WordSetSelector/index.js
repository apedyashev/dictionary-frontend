// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
import cn from 'classnames';
// selectors
import {makeSelectDictionaryWordSets} from '../DictionariesList/selectors';
// components
import {Dropdown} from 'components/ui';
// other
import styles from './index.css';

function WordSetSelector({value, topbarButton, allWordsText, onChange, wordSets}) {
  const options = wordSets
    .map((wordSet) => ({
      key: wordSet.get('id'),
      text: wordSet.get('title'),
      value: wordSet.get('id'),
    }))
    .toJS();
  // push 'all words' to the beginning
  options.unshift({key: 0, text: allWordsText, value: '0'});

  return (
    <Dropdown
      scrolling
      value={value}
      options={options}
      className={cn({[styles.topbarButton]: topbarButton})}
      onChange={onChange}
    />
  );
}
WordSetSelector.propTypes = {
  value: PropTypes.any,
  allWordsText: PropTypes.string.isRequired,
  topbarButton: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  wordSets: PropTypes.instanceOf(Immutable.List).isRequired,
};
WordSetSelector.defaultProps = {
  value: 0,
};

const mapStateToProps = createStructuredSelector({
  wordSets: makeSelectDictionaryWordSets(),
});

export default connect(
  mapStateToProps,
  null
)(WordSetSelector);
