// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// actions
import {changeWordImage} from 'containers/screens/Dashboard/LearnWordsPage/actions';
// selectors
import {makeSelectWordLoadingStatus} from 'containers/screens/Dashboard/DictionariesPage/components/WordsList/selectors';
// components
import {Icon} from 'components/ui';
// other
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import styles from './index.css';
import '!file-loader?name=[name].[ext]!images/no-image.png';

function PromptingImage({src, wordId, removeInProgress, changeWordImage}) {
  return (
    <div className={styles.root}>
      <span className={styles.imageWrapper}>
        <img src={src || '/no-image.png'} className={styles.image} />
        <Icon
          name={removeInProgress ? 'spinner' : 'close'}
          disabled={removeInProgress}
          loading={removeInProgress}
          className={styles.icon}
          onClick={() => changeWordImage(wordId)}
        />
      </span>
    </div>
  );
}
PromptingImage.propTypes = {
  src: PropTypes.string,
  removeInProgress: PropTypes.bool.isRequired,
  changeWordImage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  removeInProgress: makeSelectWordLoadingStatus(),
});

export default compose(
  connect(
    mapStateToProps,
    {changeWordImage}
  ),
  withErrorBoundary
)(PromptingImage);
