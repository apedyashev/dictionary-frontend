// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadWords} from './actions';
// selectors
import {makeSelectDictionarIdBySlug} from '../DictionariesList/selectors';
import {makeSelectWords, makeSelectWordsHasNextPage} from './selectors';
// components
import InfiniteList from 'components/InfiniteList';
import {Word} from 'components/ui';

class WordsList extends React.Component {
  static propTypes = {};
  state = {};

  loadNextPage = ({page, perPage}) => {
    const {dictionaryId} = this.props;
    this.props.loadWords({dictionaryId}, {page, perPage});
  };

  getRowHeight = () => {
    return 30;
  };
  noRowsRenderer = () => {
    return <div>No rows</div>;
  };

  rowRenderer = ({item, index, key, style}) => {
    return <Word key={key} style={style} data={item.toJS()} />;
  };

  render() {
    const {dictionarySlug, dictionaryId, words, hasNextPage} = this.props;
    return (
      <div>
        WordsList: {dictionarySlug}, {dictionaryId}
        {dictionaryId && (
          <InfiniteList
            hasNextPage={hasNextPage}
            perPage={30}
            items={words}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            getRowHeight={this.getRowHeight}
            loadNextPage={this.loadNextPage}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaryId: makeSelectDictionarIdBySlug(),
  words: makeSelectWords(),
  hasNextPage: makeSelectWordsHasNextPage(),
  // loading: makeSelectDictionariesLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadWords: ({dictionaryId}, query) => dispatch(loadWords({dictionaryId}, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
