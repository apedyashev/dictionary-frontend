import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import _without from 'lodash/without';
import _shuffle from 'lodash/shuffle';
import {push} from 'react-router-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {addWordToWordSet, deleteWordsBatch} from './components/WordsList/actions';
import {sendWordsForLearning} from 'containers/screens/Dashboard/LearnWordsPage/actions';
// selectors
import {
  makeSelectDictionarIdBySlug,
  makeSelectTranslateDirection,
} from './components/DictionariesList/selectors';
// components
import {AppContainer} from 'components';
import {Sidebar, Menu} from 'semantic-ui-react';
import {Prompt} from 'components/ui';
import {Topbar, Dictionaries, WordsList} from './components';
// other
import messages from './messages';
import styles from './index.css';

export class DictionariesPage extends React.PureComponent {
  static propTypes = {
    translateDirection: PropTypes.string,
    dictionaryId: PropTypes.string,
    deleteWordsBatch: PropTypes.func.isRequired,
    addWordToWordSet: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    sendWordsForLearning: PropTypes.func.isRequired,
  };
  state = {
    isDictionarySelected: !!this.props.match.params.slug,
    showDictionariesList: !this.props.match.params.slug,
    selectedWordSetId: '0',
    searchString: '',
    selectedWordIds: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {slug} = nextProps.match.params;
    if (slug !== prevState.prevSlug) {
      return {
        showDictionariesList: !slug,
        isDictionarySelected: !!slug,
        // reset selected wordsset when dictionary is changed
        selectedWordSetId: '0',
        prevSlug: slug,
        // reset selected words list
        selectedWordIds: [],
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

  handleLearnClick = () => {
    const {selectedWordIds} = this.state;
    console.log('send words to learning', selectedWordIds.length, this.props.match.params);
    const {slug} = this.props.match.params;
    this.props.dispatch(push(`/learn-words/${slug}`));
    this.props.sendWordsForLearning(_shuffle(selectedWordIds));
  };

  handleAllWordsUncheck = () => {
    console.log('uncheck');
    this.setState({selectedWordIds: []});
  };

  render() {
    const {
      showDictionariesList,
      isDictionarySelected,
      selectedWordSetId,
      searchString,
      selectedWordIds,
    } = this.state;
    const {dictionaryId, translateDirection} = this.props;
    return (
      <div>
        <Helmet>
          <title>My Dictionaries</title>
        </Helmet>
        <AppContainer
          withMobileTopbar
          withDesktopTopbar
          topbar={
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
              onLearnClick={this.handleLearnClick}
              onAllWordsUncheck={this.handleAllWordsUncheck}
            />
          }
        >
          <Sidebar.Pushable className={styles.pushable}>
            <Sidebar
              className={styles.dictionariesSidebar}
              as={Menu}
              animation="push"
              width="wide"
              visible={showDictionariesList}
              vertical
            >
              <Dictionaries key={showDictionariesList} />
            </Sidebar>
            <Sidebar.Pusher className={styles.pusher}>
              {isDictionarySelected ? (
                <WordsList
                  scrollElement={this.contentRootRef}
                  dictionaryId={dictionaryId}
                  wordSetId={selectedWordSetId}
                  searchString={searchString}
                  onWordCheck={this.handleWordCheck}
                  selectedWordIds={selectedWordIds}
                />
              ) : (
                <Prompt title={<FormattedMessage {...messages.selectDictionaryPromptTitle} />} />
              )}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </AppContainer>
      </div>
    );
  }
  //
  // render() {
  //   const {
  //     showDictionariesList,
  //     isDictionarySelected,
  //     selectedWordSetId,
  //     searchString,
  //     selectedWordIds,
  //   } = this.state;
  //   const {dictionaryId, translateDirection} = this.props;
  //   return (
  //     <div>
  //       <Helmet>
  //         <title>My Dictionaries</title>
  //       </Helmet>
  //       <Topbar
  //         selectedDictionaryId={dictionaryId}
  //         translateDirection={translateDirection}
  //         showDictionaries={showDictionariesList}
  //         selectedWordSetId={selectedWordSetId}
  //         selectedWordIds={selectedWordIds}
  //         onShowDictsToggle={this.handleShowDictsToggle}
  //         onWordSetChange={this.handleWordSetChange}
  //         onSearchChange={this.handleSearchChange}
  //         onWordsDeleteClick={this.handleWordsDeleteClick}
  //         onLearnClick={this.handleLearnClick}
  //       />
  //       <div>
  //         <Sidebar.Pushable className={styles.pushable}>
  //           <Sidebar
  //             className={styles.dictionariesSidebar}
  //             as={Menu}
  //             animation="push"
  //             width="wide"
  //             visible={showDictionariesList}
  //             vertical
  //           >
  //             <Dictionaries key={showDictionariesList} />
  //           </Sidebar>
  //           <Sidebar.Pusher className={styles.pusher}>
  //             {/*
  //             <div
  //               style={{display: 'flex', flexGrow: '1'}}
  //               ref={(node) => {
  //                 // new createRef API (v16.3) only works when pages is reloaded but for some reason
  //                 // when route is changed it's `current` value is null
  //                 this.contentRootRef = node;
  //               }}
  //             >
  //             */}
  //
  //             {isDictionarySelected ? (
  //               <WordsList
  //                 scrollElement={this.contentRootRef}
  //                 dictionaryId={dictionaryId}
  //                 wordSetId={selectedWordSetId}
  //                 searchString={searchString}
  //                 onWordCheck={this.handleWordCheck}
  //                 selectedWordIds={selectedWordIds}
  //               />
  //             ) : (
  //               <Prompt title={<FormattedMessage {...messages.selectDictionaryPromptTitle} />} />
  //             )}
  //             {/* </div> */}
  //           </Sidebar.Pusher>
  //         </Sidebar.Pushable>
  //       </div>
  //     </div>
  //   );
  // }
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
    sendWordsForLearning: (wordIds) => dispatch(sendWordsForLearning(wordIds)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DictionariesPage);
