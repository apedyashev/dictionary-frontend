// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
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
  state = {
    shouldListBeReset: false,
    // must be initialized, otherwise list will be reset immideately after mount
    // eslint-disable-next-line
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
    console.log('componentDidMount');
    this.props.resetWords();
  }

  componentDidUpdate() {
    // TODO: get rig of shouldListBeReset
    if (this.state.shouldListBeReset) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({shouldListBeReset: false});
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordsList);
