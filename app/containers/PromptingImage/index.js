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
import {Icon, Loader} from 'components/ui';
import ReactImage from 'react-image';
// other
import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import styles from './index.css';
import '!file-loader?name=[name].[ext]!images/no-image.png';

function PromptingImage({src, wordId, removeInProgress, changeImage}) {
  // <img src={src || '/no-image.png'} alt="" className={styles.image} />

  //
  return (
    <div className={styles.root}>
      <span className={styles.imageWrapper}>
        <ReactImage
          className={styles.image}
          src={[src, '/no-image.png']}
          loader={<Loader size={100} className={styles.loader} />}
        />
        <Icon
          name={removeInProgress ? 'spinner' : 'close'}
          disabled={removeInProgress}
          loading={removeInProgress}
          className={styles.icon}
          onClick={() => changeImage(wordId)}
        />
      </span>
    </div>
  );
}
PromptingImage.propTypes = {
  src: PropTypes.string,
  wordId: PropTypes.string.isRequired,
  removeInProgress: PropTypes.bool.isRequired,
  changeImage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  removeInProgress: makeSelectWordLoadingStatus(),
});

export default compose(
  connect(
    mapStateToProps,
    {changeImage: changeWordImage}
  ),
  withErrorBoundary
)(PromptingImage);
