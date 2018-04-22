// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _isEqual from 'lodash/isEqual';
import * as jsDiff from 'diff';
// components
import {Button, Grid, Image, Label} from 'semantic-ui-react';
import {FormatWordDefinitions} from 'components';
import TrainWritingForm from '../TrainWritingForm';
// other
import styles from './index.css';

const ANSWERED_CORRECTLY = 'corerctly';
const ANSWERED_WRONG = 'wrong';
class TrainWritingCard extends React.PureComponent {
  static propTypes = {};
  state = {
    typedPhraseWithDiff: null,
    answered: null, // (correctly|wrong)
  };
  nextButtonRef = React.createRef();
  errorButtonRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const {answered} = this.state;
    if (!prevState.answered && answered === ANSWERED_CORRECTLY) {
      this.nextButtonRef.current.focus();
    } else if (!prevState.answered && answered === ANSWERED_WRONG) {
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
        const className = part.added ? styles.added : part.removed ? styles.removed : '';
        typedPhraseWithDiff.push(<span className={className}>{part.value}</span>);
      });
      this.setState({typedPhraseWithDiff, answered: ANSWERED_WRONG});
    }
  };

  handleAnsweredCorrectly = () => {
    this.props.onNext(true);
  };

  handleErrorBtnClick = () => {
    console.log('it is an error');
    this.props.onNext(false);
  };

  render() {
    const {answered, typedPhraseWithDiff} = this.state;
    const {word} = this.props;
    return (
      <React.Fragment>
        <div>
          <FormatWordDefinitions word={word.toJS()} />
        </div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image fluid src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />
            </Grid.Column>
            <Grid.Column width={10}>
              <TrainWritingForm onCheck={this.handleCheck} />
              <div className={styles.resultMessage}>
                {answered === ANSWERED_CORRECTLY && (
                  <div className={styles.correctAnswerNotification}>Excelent!</div>
                )}
                {typedPhraseWithDiff && (
                  <div>
                    <div className={styles.correctAnswerContainer}>
                      <div className={styles.header}>Correct answer:</div>
                      <div>{word.get('word')}</div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.header}>
                        You've made a mistake, please check if it's a typo or an error
                      </div>
                      <div>
                        <Label color="red">Missing charachters</Label>
                        <Label color="green">Redundant charachters</Label>
                      </div>
                      <div>{typedPhraseWithDiff}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.buttonsContainer}>
                {answered === ANSWERED_CORRECTLY && (
                  <Button
                    ref={this.nextButtonRef}
                    content="Next"
                    onClick={this.handleAnsweredCorrectly}
                  />
                )}
                {answered === ANSWERED_WRONG && (
                  <React.Fragment>
                    <Button
                      negative
                      ref={this.errorButtonRef}
                      content="It's an error"
                      onClick={this.handleErrorBtnClick}
                    />
                    <Button content="It's a typo" onClick={this.handleAnsweredCorrectly} />
                  </React.Fragment>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TrainWritingCard;
