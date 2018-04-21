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

import {Paper, WhiteBoard} from 'components/ui';
import {ChooseOptionCard} from './components';
// other
import styles from './index.css';

const word = {};
export class LearnWordsPage extends React.PureComponent {
  static propTypes = {
    // dictionaries: Map
    // learnedWords: List
  };
  state = {
    curWordIndex: 0,
  };

  componentDidMount() {
    const {dictionaryId, dictionaries} = this.props;
    if (dictionaryId) {
      // this.props.loadRandomWords({dictionaryId});
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
      // this.props.loadRandomWords({dictionaryId});
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
          {onlyForLearning: true, limit: 6},
          {resolve, reject}
        );
      }).then(({response: {result}}) => {
        console.log('resp', result.items);
        this.props.sendWordsForLearning(result.items);
      });
    }
  };

  handleAnswerSelected = (isAnswerCorrect) => {
    console.log('isAnswerCorrect', isAnswerCorrect);
  };

  handleNextClick = () => {
    const {curWordIndex} = this.state;
    const {learnedWords} = this.props;
    console.log('learnedWords', learnedWords);
    if (curWordIndex + 1 < learnedWords.size - 1) {
      this.setState({curWordIndex: curWordIndex + 1});
    } else {
      // all the words were learned
      console.log('all the words were learned');
    }
  };

  render() {
    const {curWordIndex} = this.state;
    const {learnedWords} = this.props;
    console.log('learnedWords', curWordIndex, learnedWords);
    return (
      <div>
        <Helmet>
          <title>Learn words</title>
        </Helmet>

        {!!learnedWords.size && (
          <WhiteBoard>
            <ChooseOptionCard
              key={curWordIndex}
              word={learnedWords.get(curWordIndex) || {}}
              onAnswerSelected={this.handleAnswerSelected}
              onNextClick={this.handleNextClick}
            />
          </WhiteBoard>
        )}
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
