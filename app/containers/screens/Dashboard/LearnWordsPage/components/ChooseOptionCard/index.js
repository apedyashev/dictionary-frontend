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
import {Button, Grid, Image} from 'semantic-ui-react';
import {FormatWordDefinitions} from 'components';
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
  };
  correctAnswerIndex = _random(NUM_OF_OPTIONS_IN_CARD - 1);

  handleAnswerSelected = (selectedOptionIndex) => {
    this.setState({selectedOptionIndex});
    console.log('correctAnswerIndex', this.correctAnswerIndex, selectedOptionIndex);
    // this.props.onAnswerSelected(this.correctAnswerIndex === selectedOptionIndex);
  };

  handleNextClick = () => {
    this.props.onNextClick(this.correctAnswerIndex === this.state.selectedOptionIndex);
  };

  render() {
    const {selectedOptionIndex} = this.state;
    const {word, randomWords, directTranslation} = this.props;
    const options = randomWords.insert(this.correctAnswerIndex, word).toJS();
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {directTranslation ? word.get('word') : <FormatWordDefinitions word={word.toJS()} />}
            <Image
              size="small"
              src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
            />
          </Grid.Column>
          <Grid.Column>
            {options.map((option, index) => {
              const isActive = selectedOptionIndex === index;
              const isActiveSelected = selectedOptionIndex >= 0;
              // console.log('selectedOptionIndex', selectedOptionIndex);
              return (
                <Button
                  fluid
                  key={option.id}
                  active={isActive}
                  disabled={isActiveSelected}
                  className={cn(styles.option, {
                    [styles.correct]:
                      // if correct answer is clicked
                      (isActive && selectedOptionIndex === this.correctAnswerIndex) ||
                      // if wrong answer is clicked we still want to show which one is correct
                      (isActiveSelected && this.correctAnswerIndex === index),
                    [styles.wrong]: isActive && selectedOptionIndex !== this.correctAnswerIndex,
                  })}
                  content={
                    directTranslation ? <FormatWordDefinitions word={option} /> : option.word
                  }
                  onClick={() => this.handleAnswerSelected(index)}
                />
              );
            })}

            <Button
              fluid
              disabled={selectedOptionIndex < 0}
              className={styles.nextButton}
              content="next"
              onClick={this.handleNextClick}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  randomWords: makeSelectRandomWords(),
});

export default compose(connect(mapStateToProps, null), withErrorBoundary)(ChooseOptionCard);
