import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import _without from 'lodash/without';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';
// actions
import {addWordToWordSet, deleteWordsBatch} from './components/WordsList/actions';
// selectors
import {
  makeSelectDictionarIdBySlug,
  makeSelectTranslateDirection,
} from './components/DictionariesList/selectors';

import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import {Prompt} from 'components/ui';
import {Topbar, Dictionaries, WordsList} from './components';
// other
import styles from './index.css';

export class DictionariesPage extends React.PureComponent {
  static propTypes = {};
  state = {
    isDictionarySelected: !!this.props.match.params.slug,
    showDictionariesList: !this.props.match.params.slug,
    selectedWordSetId: 0,
    searchString: '',
    selectedWordIds: [],
  };
  contentRootRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const {slug} = nextProps.match.params;
    if (slug !== prevState.prevSlug) {
      return {
        showDictionariesList: !slug,
        isDictionarySelected: !!slug,
        // reset selected wordsset when dictionary is changed
        selectedWordSetId: 0,
        prevSlug: slug,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  handleShowDictsToggle = () => {
    this.setState({showDictionariesList: !this.state.showDictionariesList});
  };

  handleWordSetChange = (selectedWordSetId) => {
    const {selectedWordIds} = this.state;
    const {dictionaryId} = this.props;
    if (selectedWordIds.length) {
      console.log('add to selecetd words', selectedWordSetId);
      this.props.addWordToWordSet({dictionaryId, wordSetId: selectedWordSetId}, selectedWordIds);
    } else {
      this.setState({selectedWordSetId});
    }
  };

  handleSearchChange = (searchString) => {
    this.setState({searchString});
  };

  handleWordCheck = (wordId, checked) => {
    let selectedWordIds;
    if (checked) {
      selectedWordIds = [...this.state.selectedWordIds, wordId];
    } else {
      selectedWordIds = _without(this.state.selectedWordIds, wordId);
    }
    this.setState({selectedWordIds});
  };

  handleWordsDeleteClick = () => {
    const {selectedWordIds} = this.state;
    console.log('delete', selectedWordIds);
    new Promise((resolve, reject) => {
      this.props.deleteWordsBatch(selectedWordIds, {resolve, reject});
    }).then(() => {
      this.setState({selectedWordIds: []});
    });
  };

  render() {
    const {dictionaryId, translateDirection} = this.props;
    const {
      showDictionariesList,
      isDictionarySelected,
      selectedWordSetId,
      searchString,
      selectedWordIds,
    } = this.state;
    console.log('selectedWordIds', selectedWordIds);
    return (
      <div>
        <Topbar
          selectedDictionaryId={dictionaryId}
          translateDirection={translateDirection}
          showDictionaries={showDictionariesList}
          selectedWordSetId={selectedWordSetId}
          selectedWordIds={selectedWordIds}
          onShowDictsToggle={this.handleShowDictsToggle}
          onWordSetChange={this.handleWordSetChange}
          onSearchChange={this.handleSearchChange}
          onWordsDeleteClick={this.handleWordsDeleteClick}
        />
        <div style={{paddingTop: 42}}>
          <Sidebar.Pushable className={styles.pushable}>
            <Sidebar
              className={styles.dictionariesSidebar}
              as={Menu}
              animation="push"
              width="wide"
              visible={showDictionariesList}
              vertical
            >
              <Dictionaries />
            </Sidebar>
            <Sidebar.Pusher className={styles.pusher}>
              <div ref={this.contentRootRef}>
                {isDictionarySelected ? (
                  <WordsList
                    scrollElement={this.contentRootRef.current}
                    dictionaryId={dictionaryId}
                    wordSetId={selectedWordSetId}
                    searchString={searchString}
                    onWordCheck={this.handleWordCheck}
                    selectedWordIds={selectedWordIds}
                  />
                ) : (
                  <Prompt title="please select a dictionary" />
                )}
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaryId: makeSelectDictionarIdBySlug(),
  translateDirection: makeSelectTranslateDirection(),
});
function mapDispatchToProps(dispatch) {
  return {
    addWordToWordSet: ({dictionaryId, wordSetId}, wordIds, {resolve, reject} = {}) =>
      dispatch(addWordToWordSet({dictionaryId, wordSetId}, wordIds, {resolve, reject})),
    deleteWordsBatch: (wordIds, {resolve, reject} = {}) =>
      dispatch(deleteWordsBatch(wordIds, {resolve, reject})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionariesPage);
