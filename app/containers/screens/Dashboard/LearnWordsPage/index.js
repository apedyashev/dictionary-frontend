import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
// import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {loadRandomWords, sendWordsForLearning} from './actions';
import {loadDictionaries} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/actions';
// selectors
import {
  makeSelectDictionarIdBySlug,
  makeSelectDictionaries,
} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/selectors';
import {makeSelectLearnedWords} from './selectors';
// components
import {Paper, WhiteBoard, PageLoader} from 'components/ui';
import {ChooseOptionCard, TrainWritingCard} from './components';
// other
import {NUM_OF_WORDS_TO_LEARN} from './constants';
import styles from './index.css';

const word = {};
export class LearnWordsPage extends React.PureComponent {
  static propTypes = {
    // dictionaries: Map
    // learnedWords: List
  };
  state = {
    curWordIndex: 0,
    trainingName: 'writing', // 'word-translation', // translation-word
  };

  componentDidMount() {
    const {dictionaryId, dictionaries} = this.props;
    if (dictionaryId) {
      this.loadWords();
    }

    if (!dictionaries.count()) {
      this.props.loadDictionaries();
    }
  }

  componentDidUpdate(prevProps) {
    const {dictionaryId, dictionaries} = this.props;
    // if page is reloaded, dictionaryId will be available only after loading
    // all the dictionanries
    if (!prevProps.dictionaryId && dictionaryId) {
      this.loadWords();
    }
  }

  loadWords = () => {
    const {dictionaryId, learnedWords} = this.props;
    const excludeWords = learnedWords.toJS().map((word) => word.id);
    console.log('excludeWords', excludeWords);
    this.props.loadRandomWords(dictionaryId, {excludeWords});

    if (!learnedWords.size) {
      new Promise((resolve, reject) => {
        this.props.loadRandomWords(
          dictionaryId,
          {onlyForLearning: true, limit: NUM_OF_WORDS_TO_LEARN},
          {resolve, reject}
        );
      }).then(({response: {result}}) => {
        this.props.sendWordsForLearning(result.items);
      });
    }
  };

  // handleAnswerSelected = (isAnswerCorrect) => {
  //   console.log('isAnswerCorrect', isAnswerCorrect);
  // };

  handleNextClick = (isAnswerCorrect) => {
    const {curWordIndex} = this.state;
    const {learnedWords} = this.props;
    if (curWordIndex + 1 < learnedWords.size - 1) {
      this.setState({curWordIndex: curWordIndex + 1});
    } else {
      // all the words were learned
      console.log('all the words were learned');
      this.setState({curWordIndex: 0, trainingName: 'translation-word'});
    }
    console.log('isAnswerCorrect', isAnswerCorrect);
  };

  render() {
    const {curWordIndex, trainingName} = this.state;
    const {learnedWords} = this.props;
    console.log('learnedWords', curWordIndex, learnedWords);
    const showLoader = !learnedWords.size;
    if (showLoader) {
      return <PageLoader message="Loading words" />;
    }

    return (
      <div>
        <Helmet>
          <title>Learn words</title>
        </Helmet>

        <WhiteBoard>
          {['word-translation', 'translation-word'].includes(trainingName) ? (
            <ChooseOptionCard
              key={curWordIndex}
              directTranslation={trainingName === 'word-translation'}
              word={learnedWords.get(curWordIndex)}
              // onAnswerSelected={this.handleAnswerSelected}
              onNextClick={this.handleNextClick}
            />
          ) : (
            <TrainWritingCard
              key={curWordIndex}
              word={learnedWords.get(curWordIndex)}
              onNext={this.handleNextClick}
            />
          )}
        </WhiteBoard>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  dictionaryId: makeSelectDictionarIdBySlug(),
  dictionaries: makeSelectDictionaries(),
  learnedWords: makeSelectLearnedWords(),
});
function mapDispatchToProps(dispatch) {
  return {
    loadRandomWords: (dictionaryId, query, {resolve, reject} = {}) =>
      dispatch(loadRandomWords(dictionaryId, query, {resolve, reject})),
    loadDictionaries: () => dispatch(loadDictionaries()),
    sendWordsForLearning: (wordIds) => dispatch(sendWordsForLearning(wordIds)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordsPage);
