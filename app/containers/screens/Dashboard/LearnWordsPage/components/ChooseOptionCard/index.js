// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import cn from 'classnames';
import _random from 'lodash/random';
// selectors
import {makeSelectRandomWords} from 'containers/screens/Dashboard/LearnWordsPage/selectors';
// components
import {Button, Grid, Image} from 'semantic-ui-react';
// other
import {NUM_OF_OPTIONS_IN_CARD} from '../../constants';
import styles from './index.css';

class ChooseOptionCard extends React.PureComponent {
  static propTypes = {
    word: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  state = {
    selectedOptionIndex: -1,
  };
  correctAnswerIndex = _random(NUM_OF_OPTIONS_IN_CARD);

  handleAnswerSelected = (selectedOptionIndex) => {
    this.setState({selectedOptionIndex});
    this.props.onAnswerSelected(this.correctAnswerIndex === selectedOptionIndex);
  };

  render() {
    const {selectedOptionIndex} = this.state;
    const {word, randomWords} = this.props;
    const options = randomWords.insert(this.correctAnswerIndex, word).toJS();
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            {word.get('word')}
            <Image src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column>
            {options.map((option, index) => {
              const isActive = selectedOptionIndex === index;

              return (
                <Button
                  fluid
                  key={option.id}
                  active={isActive}
                  disabled={selectedOptionIndex > 0 && !isActive}
                  className={cn(styles.option, {
                    [styles.correct]: isActive && selectedOptionIndex === this.correctAnswerIndex,
                    [styles.wrong]: isActive && selectedOptionIndex !== this.correctAnswerIndex,
                  })}
                  content={option.word}
                  onClick={() => this.handleAnswerSelected(index)}
                />
              );
            })}

            <Button
              fluid
              disabled={selectedOptionIndex < 0}
              className={styles.nextButton}
              content="next"
              onClick={this.props.onNextClick}
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

function mapDispatchToProps(dispatch) {
  return {
    // loadDictionaries: () => dispatch(loadDictionaries()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseOptionCard);
