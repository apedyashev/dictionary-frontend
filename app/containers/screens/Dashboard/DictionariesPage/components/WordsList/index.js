// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadWords, resetWords} from './actions';
// selectors
import {makeSelectWords, makeSelectWordsHasNextPage} from './selectors';
// components
import {FormattedMessage} from 'react-intl';
import InfiniteList from 'components/InfiniteList';
import {Word} from 'components/ui';
// other
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import messages from './messages';

class WordsList extends React.PureComponent {
  static propTypes = {
    scrollElement: PropTypes.node,
    hasNextPage: PropTypes.bool.isRequired,
    words: PropTypes.instanceOf(Immutable.List),
    onWordCheck: PropTypes.func.isRequired,
    selectedWordIds: PropTypes.array.isRequired,
    searchString: PropTypes.string,
    wordSetId: PropTypes.string,
    dictionaryId: PropTypes.string.isRequired,
    loadWords: PropTypes.func.isRequired,
    resetWords: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.props.resetWords();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.dictionaryId !== prevProps.dictionaryId ||
      this.props.wordSetId !== prevProps.wordSetId ||
      this.props.searchString !== prevProps.searchString
    ) {
      this.props.resetWords();
    }
  }

  loadNextPage = ({page, perPage}) => {
    const {dictionaryId, wordSetId, searchString: search} = this.props;
    if (wordSetId && wordSetId !== '0') {
      this.props.loadWords({dictionaryId, wordSetId}, {page, perPage, search});
    } else {
      this.props.loadWords({dictionaryId}, {page, perPage, search});
    }
  };

  getRowHeight = (/* {index, rowData} */) => {
    // must be changed along with line-height value in app/components/ui/Word/index.css
    return 30;
  };

  rowRenderer = ({item, key, style}) => {
    const {selectedWordIds} = this.props;
    return (
      <Word
        key={key}
        checked={selectedWordIds.includes(item.get('id'))}
        style={style}
        data={item.toJS()}
        learnedLabelText={<FormattedMessage {...messages.learnedLabelText} />}
        onCheck={this.props.onWordCheck}
      />
    );
  };

  render() {
    const {dictionaryId, wordSetId, searchString, words, hasNextPage, scrollElement} = this.props;
    return (
      dictionaryId && (
        <InfiniteList
          key={[dictionaryId, wordSetId, searchString].join('-')}
          scrollElement={scrollElement}
          hasNextPage={hasNextPage}
          perPage={50}
          items={words}
          rowRenderer={this.rowRenderer}
          dataLoadingMessage={<FormattedMessage {...messages.dataLoadingMessage} />}
          noRowsMessage={<FormattedMessage {...messages.noRowsMessage} />}
          getRowHeight={this.getRowHeight}
          loadNextPage={this.loadNextPage}
          resetProps={{dictionaryId, wordSetId, searchString}}
        />
      )
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withErrorBoundary
)(WordsList);
