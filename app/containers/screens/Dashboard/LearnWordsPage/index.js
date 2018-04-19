import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
// import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
// import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// import injectReducer from 'utils/injectReducer';
// actions
// import {sendWordsForLearning} from './actions';
// selectors
// import {
//   makeSelectDictionarIdBySlug,
//   makeSelectTranslateDirection,
// } from './components/DictionariesList/selectors';

// import {Sidebar, Menu} from 'semantic-ui-react';
import {Prompt} from 'components/ui';
// import {Topbar, Dictionaries, WordsList} from './components';
// other
// import reducer from './reducer';
import styles from './index.css';

export class LearnWordsPage extends React.PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <Helmet>
          <title>Learn words</title>
        </Helmet>
        <Prompt title="Learn words page" subtitle="Coming soon" />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // dictionaryId: makeSelectDictionarIdBySlug(),
  // translateDirection: makeSelectTranslateDirection(),
});
function mapDispatchToProps() {
  return {
    // sendWordsForLearning: (wordIds) => dispatch(sendWordsForLearning(wordIds)),
    // deleteWordsBatch: (wordIds, {resolve, reject} = {}) =>
    //   dispatch(deleteWordsBatch(wordIds, {resolve, reject})),
  };
}
// const withReducer = injectReducer({key: 'learnWords', reducer});
// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(
//   withReducer,
//   // withSaga,
//   withConnect
// )(LearnWordsPage);
export default connect(mapStateToProps, mapDispatchToProps)(LearnWordsPage);
