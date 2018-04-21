// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import _isEqual from 'lodash/isEqual';
// components
import {Button, Grid, Image} from 'semantic-ui-react';
import {FormatWordDefinitions} from 'components';
import TrainWritingForm from '../TrainWritingForm';
// other
import styles from './index.css';

class TrainWritingCard extends React.PureComponent {
  static propTypes = {};

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
      this.props.onNext();
    } else {
      //
    }
  };

  render() {
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
              <div className={styles.resultMessage}>result message</div>
              <Button content="Next" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default TrainWritingCard;
