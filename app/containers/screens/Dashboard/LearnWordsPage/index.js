import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import _isEqual from 'lodash/isEqual';
import _values from 'lodash/values';
import _each from 'lodash/each';
import _every from 'lodash/every';
// import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Immutable from 'immutable';
// actions
import {loadRandomWords, sendWordsForLearning} from './actions';
import {loadDictionaries} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/actions';
import {updateWord} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/actions';
// selectors
import {
  makeSelectDictionarIdBySlug,
  makeSelectDictionaries,
} from 'containers/screens/Dashboard/DictionariesPage/components/DictionariesList/selectors';
import {makeSelectLearnedWords} from './selectors';
// components
import {WhiteBoard, PageLoader} from 'components/ui';
import {ChooseOptionCard, TrainWritingCard, TrainingsFinishedCard, Topbar} from './components';
// other
import {
  NUM_OF_OPTIONS_IN_CARD,
  NUM_OF_WORDS_TO_LEARN,
  TRAINING_WORD_TRANSLATION,
  TRAINING_WRITING,
  TRAINING_TRANSLATION_WORD,
} from './constants';

// all those training names must have correcspongin fields in the learnedStatus
// object in backend Word model
const trainings = [TRAINING_WORD_TRANSLATION, TRAINING_WRITING, TRAINING_TRANSLATION_WORD];
export class LearnWordsPage extends React.PureComponent {
  static propTypes = {
    dictionaryId: PropTypes.sting.isRequired,
    dictionaries: PropTypes.instanceOf(Immutable.Map),
    learnedWords: PropTypes.instanceOf(Immutable.List),
    match: PropTypes.shape({
      params: PropTypes.shape({slug: PropTypes.string.isRequired}).isRequired,
    }).isRequired,
    updateWord: PropTypes.func.isRequired,
    loadRandomWords: PropTypes.func.isRequired,
    loadDictionaries: PropTypes.func.isRequired,
    sendWordsForLearning: PropTypes.func.isRequired,
  };
  state = {
    curWordIndex: 0,
    curTrainingIndex: 0,
    trainingName: trainings[0],
    learnedStatus: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const learnedWordIds = nextProps.learnedWords
      .toJS()
      .map((word) => word.id)
      .sort();

    if (!_isEqual(learnedWordIds, prevState.learnedWordIds)) {
      return {
        learnedStatus: learnedWordIds.reduce((acc, id) => {
          acc[id] = trainings.reduce((trAcc, trainingName) => {
            // eslint-disable-next-line no-param-reassign
            trAcc[trainingName] = false;
            return trAcc;
          }, {});
          return acc;
        }, {}),
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
    const {dictionaryId} = this.props;
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
      learnedStatus: {},
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
    const {curWordIndex, curTrainingIndex, learnedStatus} = this.state;
    const {learnedWords} = this.props;

    // if (!isAnswerCorrect) {
    const wordId = learnedWords.getIn([curWordIndex, 'id']);
    const curTrainingName = trainings[curTrainingIndex];
    learnedStatus[wordId][curTrainingName] = isAnswerCorrect;
    // }

    if (curWordIndex + 1 < learnedWords.size) {
      // go to the next word
      this.setState({curWordIndex: curWordIndex + 1, learnedStatus});
    } else {
      // all the words were learned
      if (curTrainingIndex + 1 < trainings.length) {
        console.log('trainings', curTrainingIndex + 1, trainings);
        // go to the next training
        this.setState({
          curWordIndex: 0,
          curTrainingIndex: curTrainingIndex + 1,
          trainingName: trainings[curTrainingIndex + 1],
          learnedStatus,
        });
      } else {
        // all trainings have been finished
        const wordsWithErrors = _values(learnedStatus).reduce((totalAcc, wordTrainingsStatus) => {
          const allTrainingsSuccessfull = _every(_values(wordTrainingsStatus), (val) => val);
          return totalAcc + (allTrainingsSuccessfull ? 0 : 1);
        }, 0);
        const wordsLearned = learnedWords.size - wordsWithErrors;
        this.setState({trainingName: 'done', wordsLearned});
        _each(learnedStatus, (wordLearnedStatus, curWordId) => {
          this.props.updateWord(curWordId, {learnedStatus: wordLearnedStatus});
        });
      }
    }
    console.log('isAnswerCorrect', isAnswerCorrect);
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
    console.log('trainingName', trainingName);
    return (
      <div>
        <Helmet>
          <title>Learn words</title>
        </Helmet>

        <Topbar dictionarySlug={params.slug} />
        <WhiteBoard>
          {[TRAINING_WORD_TRANSLATION, TRAINING_TRANSLATION_WORD].includes(trainingName) && (
            <ChooseOptionCard
              key={curWordIndex}
              directTranslation={trainingName === TRAINING_WORD_TRANSLATION}
              word={learnedWords.get(curWordIndex)}
              onNextClick={this.handleNextClick}
            />
          )}
          {trainingName === TRAINING_WRITING && (
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
    updateWord: (wordId, values, {resolve, reject} = {}) =>
      dispatch(updateWord(wordId, values, {resolve, reject})),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordsPage);
