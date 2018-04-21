// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
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
  correctAnswerIndex = _random(NUM_OF_OPTIONS_IN_CARD);

  render() {
    const {word, randomWords} = this.props;
    const options = randomWords.insert(this.correctAnswerIndex, word).toJS();
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image src="https://react.semantic-ui.com/assets/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column>
            {options.map((option) => {
              // console.log('option', option);
              return (
                <Button key={option.id} fluid className={styles.option} content={option.word} />
              );
            })}
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
