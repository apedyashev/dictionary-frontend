// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadWords, resetWords} from './actions';
// selectors
import {makeSelectDictionarIdBySlug} from '../DictionariesList/selectors';
import {makeSelectWords, makeSelectWordsHasNextPage} from './selectors';
// components
import InfiniteList from 'components/InfiniteList';
import {Word, EmptyListPrompt} from 'components/ui';

class WordsList extends React.Component {
  static propTypes = {};
  state = {
    shouldListBeReset: false,
    // must be initialized, otherwise list will be reset immideately after mount
    prevSearchString: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.dictionaryId !== prevState.prevDictionaryId ||
      nextProps.wordSetId !== prevState.prevWordSetId
    ) {
      return {
        shouldListBeReset: true,
        prevDictionaryId: nextProps.dictionaryId,
        prevWordSetId: nextProps.wordSetId,
      };
    }

    if (nextProps.searchString !== prevState.prevSearchString) {
      return {
        shouldListBeReset: true,
        prevSearchString: nextProps.searchString,
      };
    }
    return null;
  }
  componentDidMount() {
    this.props.resetWords();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldListBeReset) {
      this.setState({shouldListBeReset: false});
      console.log('reset display order');
      this.props.resetWords();
    }
  }

  loadNextPage = ({page, perPage}) => {
    const {dictionaryId, wordSetId, searchString: search} = this.props;
    if (wordSetId) {
      this.props.loadWords({dictionaryId, wordSetId}, {page, perPage, search});
    } else {
      this.props.loadWords({dictionaryId}, {page, perPage, search});
    }
  };

  getRowHeight = ({index, rowData}) => {
    // must be changed along with line-height value in app/components/ui/Word/index.css
    return 30;
  };

  noRowsRenderer = () => {
    return <EmptyListPrompt title="You don't have any words" />;
  };

  rowRenderer = ({item, index, key, style}) => {
    const {selectedWordIds} = this.props;
    return (
      <Word
        key={key}
        checked={selectedWordIds.includes(item.get('id'))}
        style={style}
        data={item.toJS()}
        onCheck={this.props.onWordCheck}
      />
    );
  };

  render() {
    const {dictionaryId, wordSetId, searchString, words, hasNextPage, scrollElement} = this.props;
    console.log('words', words);
    return (
      <div style={{minHeight: 1}}>
        {dictionaryId && (
          <InfiniteList
            key={[dictionaryId, wordSetId, searchString].join('-')}
            scrollElement={scrollElement}
            hasNextPage={hasNextPage}
            perPage={50}
            items={words}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            getRowHeight={this.getRowHeight}
            loadNextPage={this.loadNextPage}
            resetProps={{dictionaryId, wordSetId, searchString}}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  words: makeSelectWords(),
  hasNextPage: makeSelectWordsHasNextPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    resetWords: () => dispatch(resetWords()),
    loadWords: ({dictionaryId, wordSetId}, query) =>
      dispatch(loadWords({dictionaryId, wordSetId}, query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
