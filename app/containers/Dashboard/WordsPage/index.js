/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {makeSelectRepos, makeSelectLoading, makeSelectError} from 'containers/App/selectors';

import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import Prompt from 'components/ui/Prompt';
import {Topbar, Dictionaries} from './components';
// other
import styles from './index.css';

export class WordsPage extends React.PureComponent {
  static propTypes = {};
  state = {showDictionaries: !this.props.match.params.slug};

  static getDerivedStateFromProps(nextProps, prevState) {
    const {slug} = nextProps.match.params;
    if (slug !== prevState.prevSlug) {
      return {
        showDictionaries: !slug,
        prevSlug: slug,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  handleShowDictsToggle = () => {
    this.setState({showDictionaries: !this.state.showDictionaries});
  };

  render() {
    const {slug} = this.props.match.params;
    const {showDictionaries} = this.state;
    return (
      <div>
        <Topbar
          showDictionaries={showDictionaries}
          onShowDictsToggle={this.handleShowDictsToggle}
        />
        <Sidebar.Pushable className={styles.content}>
          <Sidebar as={Menu} animation="push" width="wide" visible={showDictionaries} vertical>
            <Dictionaries />
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Prompt title="dictionaries" subtitle="coming soon" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

// export function mapDispatchToProps(dispatch) {
//   return {
//     loadWords: () => {
//       const token = localStorage.getItem('authToken') || '';
//       dispatch(setToken(token));
//       dispatch(loadProfileActions.request());
//     },
//   };
// }
// const mapStateToProps = createStructuredSelector({
// dictionarySlug: makeSelectDictionarySlug(),
// });
//
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// const withReducer = injectReducer({key: 'dictionaries', reducer});
// const withSaga = injectSaga({key: 'dictionaries', saga});
//
// export default compose(
//   // withReducer,
//   // withSaga,
//   withConnect
// )(WordsPage);
export default WordsPage;
