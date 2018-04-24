import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import _isEqual from 'lodash/isEqual';
// import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
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
import {WhiteBoard, PageLoader} from 'components/ui';
import {ChooseOptionCard, TrainWritingCard, TrainingsFinishedCard} from './components';
// other
import {NUM_OF_OPTIONS_IN_CARD, NUM_OF_WORDS_TO_LEARN} from './constants';
import styles from './index.css';

const trainings = ['word-translation', 'writing', 'translation-word'];
export class LearnWordsPage extends React.PureComponent {
  static propTypes = {
    // dictionaries: Map
    // learnedWords: List
  };
  state = {
    curWordIndex: 0,
    curTrainingIndex: 0,
    trainingName: trainings[0],
    // errorCounts: {},
    errorCounts: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const learnedWordIds = nextProps.learnedWords
      .toJS()
      .map((word) => word.id)
      .sort();

    if (!_isEqual(learnedWordIds, prevState.learnedWordIds)) {
      return {
        // errorCounts: learnedWordIds.reduce((acc, id) => {
        //   acc[id] = trainings.reduce((trAcc, trainingName) => {
        //     trAcc[trainingName] = 0;
        //     return trAcc;
        //   }, {});
        //   return acc;
        // }, {}),
        errorCounts: learnedWordIds.map(() => 0),
        learnedWordIds,
      };
    }

    return null;
  }

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

  reinintilizeTrainings = () => {
    this.props.sendWordsForLearning([]);
    this.setState({
      curWordIndex: 0,
      curTrainingIndex: 0,
      trainingName: trainings[0],
      // errorCounts: {},
      errorCounts: [],
    });
    this.loadWords(true);
  };

  loadWords = (forceLoad = false) => {
    const {dictionaryId, learnedWords} = this.props;
    const excludeWords = learnedWords.toJS().map((word) => word.id);
    this.props.loadRandomWords(dictionaryId, {excludeWords, limit: NUM_OF_OPTIONS_IN_CARD});

    if (!learnedWords.size || forceLoad) {
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

  handleNextClick = (isAnswerCorrect) => {
    const {curWordIndex, curTrainingIndex, errorCounts} = this.state;
    const {learnedWords} = this.props;

    if (!isAnswerCorrect) {
      // const wordId = learnedWords.getIn([curWordIndex, 'id']);
      // const curTrainingName = trainings[curTrainingIndex];
      // errorCounts[wordId][curTrainingName]++;
      errorCounts[curWordIndex]++;
    }

    if (curWordIndex + 1 < learnedWords.size) {
      this.setState({curWordIndex: curWordIndex + 1, errorCounts});
    } else {
      // all the words were learned
      console.log('all the words were learned');
      if (curTrainingIndex + 1 < trainings.length) {
        this.setState({
          curWordIndex: 0,
          curTrainingIndex: curTrainingIndex + 1,
          trainingName: trainings[curTrainingIndex + 1],
          errorCounts,
        });
      } else {
        const wordsLearned =
          learnedWords.size - errorCounts.reduce((acc, val) => (val ? acc + 1 : acc), 0);
        console.log(errorCounts);
        this.setState({trainingName: 'done', wordsLearned});
      }
    }
    console.log('errorCounts', errorCounts);
  };

  render() {
    const {curWordIndex, trainingName, wordsLearned} = this.state;
    const {
      learnedWords,
      match: {params},
    } = this.props;
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
          {['word-translation', 'translation-word'].includes(trainingName) && (
            <ChooseOptionCard
              key={curWordIndex}
              directTranslation={trainingName === 'word-translation'}
              word={learnedWords.get(curWordIndex)}
              onNextClick={this.handleNextClick}
            />
          )}
          {trainingName === 'writing' && (
            <TrainWritingCard
              key={curWordIndex}
              word={learnedWords.get(curWordIndex)}
              onNext={this.handleNextClick}
            />
          )}
          {trainingName === 'done' && (
            <TrainingsFinishedCard
              wordsLearned={wordsLearned}
              totalWords={learnedWords.size}
              slug={params.slug}
              onReinitilizeClick={this.reinintilizeTrainings}
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordsPage);
