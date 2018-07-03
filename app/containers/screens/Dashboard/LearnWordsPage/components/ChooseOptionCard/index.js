// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import cn from 'classnames';
import _random from 'lodash/random';
import Immutable from 'immutable';
// selectors
import {makeSelectRandomWords} from 'containers/screens/Dashboard/LearnWordsPage/selectors';
// components
import {Button, Grid} from 'semantic-ui-react';
import {FormatWordDefinitions} from 'components';
import PromptingImage from 'containers/PromptingImage';
import WordDefinition from '../WordDefinition';
import CheckAnswerButtons from '../CheckAnswerButtons';
// other
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import {NUM_OF_OPTIONS_IN_CARD} from '../../constants';
import styles from './index.css';

class ChooseOptionCard extends React.PureComponent {
  static propTypes = {
    word: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    directTranslation: PropTypes.bool,
    onNextClick: PropTypes.func.isRequired,
    // mapStateToProps
    randomWords: PropTypes.instanceOf(Immutable.List),
  };
  static defaultProps = {
    directTranslation: true,
  };
  state = {
    selectedOptionIndex: -1,
    correctAnswerIndex: _random(NUM_OF_OPTIONS_IN_CARD - 1),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {randomWords} = nextProps;
    if (randomWords.size !== prevState.randomWordsCount) {
      return {
        correctAnswerIndex:
          // randomWords.size === 0 means that there is only one (learning) word in whole dictionary
          randomWords.size > 0
            ? _random(Math.min(NUM_OF_OPTIONS_IN_CARD - 1, randomWords.size - 1))
            : 0,
        randomWordsCount: nextProps.randomWords.size,
      };
    }

    return null;
  }
  handleAnswerSelected = (selectedOptionIndex) => {
    this.setState({selectedOptionIndex});
    console.log('correctAnswerIndex', this.state.correctAnswerIndex, selectedOptionIndex);
    // this.props.onAnswerSelected(this.state.correctAnswerIndex === selectedOptionIndex);
  };

  handleNextClick = () => {
    this.props.onNextClick(this.state.correctAnswerIndex === this.state.selectedOptionIndex);
  };

  // "I don't know" button
  handleSkipClick = () => {
    this.props.onNextClick(false);
  };

  render() {
    const {selectedOptionIndex, correctAnswerIndex} = this.state;
    const {word, randomWords, directTranslation} = this.props;
    const options = randomWords.insert(this.state.correctAnswerIndex, word).toJS();
    return (
      <Grid className={styles.root}>
        <Grid.Column computer={8} mobile={16}>
          <PromptingImage src={word.get('image')} wordId={word.get('id')} />
          <WordDefinition directTranslation={directTranslation} word={word} />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          {options.map((option, index) => {
            const isActive = selectedOptionIndex === index;
            const isActiveSelected = selectedOptionIndex >= 0;
            return (
              <Button
                fluid
                key={option.id}
                active={isActive}
                disabled={isActiveSelected}
                className={cn(styles.option, {
                  [styles.correct]:
                    // if correct answer is clicked
                    (isActive && selectedOptionIndex === correctAnswerIndex) ||
                    // if wrong answer is clicked we still want to show which one is correct
                    (isActiveSelected && correctAnswerIndex === index),
                  [styles.wrong]: isActive && selectedOptionIndex !== correctAnswerIndex,
                })}
                content={directTranslation ? <FormatWordDefinitions word={option} /> : option.word}
                onClick={() => this.handleAnswerSelected(index)}
              />
            );
          })}

          <CheckAnswerButtons
            nextBtnProps={{
              fluid: true,
              disabled: selectedOptionIndex < 0,
              className: styles.nextButton,
              content: 'Next',
              onClick: this.handleNextClick,
            }}
            skipBtnProps={{
              fluid: true,
              disabled: selectedOptionIndex >= 0,
              className: styles.skipButton,
              content: "I don't know",
              onClick: this.handleSkipClick,
            }}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  randomWords: makeSelectRandomWords(),
});

export default compose(
  connect(mapStateToProps),
  withErrorBoundary
)(ChooseOptionCard);
