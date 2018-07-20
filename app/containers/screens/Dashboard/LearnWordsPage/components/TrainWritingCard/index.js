// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _isEqual from 'lodash/isEqual';
import * as jsDiff from 'diff';
import Immutable from 'immutable';
// components
import {FormattedMessage} from 'react-intl';
import {Grid} from 'semantic-ui-react';
import {Button, Divider, Label} from 'components/ui';
import PromptingImage from 'containers/PromptingImage';
import TrainWritingForm from '../TrainWritingForm';
import WordDefinition from '../WordDefinition';
// other
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import messages from './messages';
import styles from './index.css';

const ANSWERED_CORRECTLY = 'corerctly';
const ANSWERED_WRONG = 'wrong';
class TrainWritingCard extends React.PureComponent {
  static propTypes = {
    word: PropTypes.instanceOf(Immutable.Map),
    onNext: PropTypes.func.isRequired,
  };
  state = {
    typedPhraseWithDiff: null,
    answered: null, // (correctly|wrong)
  };
  nextButtonRef = React.createRef();
  errorButtonRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const {answered} = this.state;
    if (!prevState.answered && answered === ANSWERED_CORRECTLY && this.nextButtonRef.current) {
      this.nextButtonRef.current.focus();
    } else if (!prevState.answered && answered === ANSWERED_WRONG && this.errorButtonRef.current) {
      this.errorButtonRef.current.focus();
    }
  }

  parsePhrase = (phrase) => {
    const punctuationMarksPattern = ',|\\?|\\.|\\-|\\:|\\;|\\!|\\(|\\)|\\[|\\]';
    const splitRegExp = new RegExp(`(\\s|${punctuationMarksPattern})`);
    return phrase
      .split(splitRegExp)
      .map((w) => w.replace(new RegExp(punctuationMarksPattern), '').toLowerCase())
      .filter((w) => !!w.trim());
  };

  handleCheck = (phrase) => {
    const {word} = this.props;
    const typedPhraseParsed = this.parsePhrase(phrase);
    const originalPhraseParsed = this.parsePhrase(word.get('word'));
    console.log('phraseParsed', typedPhraseParsed);
    console.log('originalPhraseParsed', originalPhraseParsed);

    if (_isEqual(originalPhraseParsed, typedPhraseParsed)) {
      // this.props.onNext();
      this.setState({answered: ANSWERED_CORRECTLY});
    } else {
      const diff = jsDiff.diffChars(word.get('word'), phrase);
      const typedPhraseWithDiff = [];
      diff.forEach((part) => {
        let className = '';
        if (part.added) {
          className = styles.added;
        } else if (part.removed) {
          className = styles.removed;
        }
        typedPhraseWithDiff.push(<span className={className}>{part.value}</span>);
      });
      this.setState({typedPhraseWithDiff, answered: ANSWERED_WRONG});
    }
  };

  handleAnsweredCorrectly = () => {
    this.props.onNext(true);
  };

  handleErrorBtnClick = () => {
    this.props.onNext(false);
  };

  handleSkipBtnClick = () => {
    this.props.onNext(false);
  };

  render() {
    const {answered, typedPhraseWithDiff} = this.state;
    const {word} = this.props;
    if (!word) {
      return null;
    }
    return (
      <Grid columns={2} className={styles.root}>
        <Grid.Column computer={6} mobile={16}>
          <PromptingImage src={word.get('image')} wordId={word.get('id')} />

          <WordDefinition word={word} directTranslation={false} />
        </Grid.Column>
        <Grid.Column computer={10} mobile={16}>
          <TrainWritingForm onCheck={this.handleCheck} onSkipBtnClick={this.handleSkipBtnClick} />
          <div className={styles.resultMessage}>
            {answered === ANSWERED_CORRECTLY && (
              <div className={styles.correctAnswerNotification}>Excelent!</div>
            )}
            {typedPhraseWithDiff && (
              <div>
                <div className={styles.correctAnswerContainer}>
                  <div className={styles.header}>
                    <FormattedMessage {...messages.correctAnswerLabel} />
                  </div>
                  <div>{word.get('word')}</div>
                </div>
                <Divider horizontal>Check youself</Divider>
                <div className={styles.details}>
                  <div className={styles.header}>
                    <FormattedMessage {...messages.checkTheMistakeLabel} />
                  </div>
                  <div className={styles.phraseWithDiff}>{typedPhraseWithDiff}</div>
                  <div>
                    <Label color="red" underlined>
                      <FormattedMessage {...messages.missingCharactersLabel} />
                    </Label>
                    <Label color="green" underlined>
                      <FormattedMessage {...messages.redurantCharactersLabel} />
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.buttonsContainer}>
            {answered === ANSWERED_CORRECTLY && (
              <Button
                animateFocus
                positive
                ref={this.nextButtonRef}
                content={<FormattedMessage {...messages.nextButton} />}
                onClick={this.handleAnsweredCorrectly}
              />
            )}
            {answered === ANSWERED_WRONG && (
              <React.Fragment>
                <Button
                  negative
                  animateFocus
                  ref={this.errorButtonRef}
                  content={<FormattedMessage {...messages.itsErrorButton} />}
                  onClick={this.handleErrorBtnClick}
                />
                <Button
                  animateFocus
                  positive
                  content={<FormattedMessage {...messages.itsTypoButton} />}
                  onClick={this.handleAnsweredCorrectly}
                />
              </React.Fragment>
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withErrorBoundary(TrainWritingCard);
