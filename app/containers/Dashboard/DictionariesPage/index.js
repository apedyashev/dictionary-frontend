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
import {Prompt} from 'components/ui';
import {Topbar, Dictionaries, WordsList} from './components';
// other
import styles from './index.css';

export class DictionariesPage extends React.PureComponent {
  static propTypes = {};
  state = {
    isDictionarySelected: !!this.props.match.params.slug,
    showDictionariesList: !this.props.match.params.slug,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {slug} = nextProps.match.params;
    if (slug !== prevState.prevSlug) {
      return {
        showDictionariesList: !slug,
        isDictionarySelected: !!slug,
        prevSlug: slug,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  handleShowDictsToggle = () => {
    this.setState({showDictionariesList: !this.state.showDictionariesList});
  };

  render() {
    const {slug} = this.props.match.params;
    const {showDictionariesList, isDictionarySelected} = this.state;
    return (
      <div>
        <Topbar
          showDictionaries={showDictionariesList}
          onShowDictsToggle={this.handleShowDictsToggle}
        />
        <Sidebar.Pushable className={styles.content}>
          <Sidebar as={Menu} animation="push" width="wide" visible={showDictionariesList} vertical>
            <Dictionaries />
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              {isDictionarySelected ? (
                <WordsList dictionarySlug={slug} />
              ) : (
                <Prompt title="please select a dictionary" />
              )}
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
// )(DictionariesPage);
export default DictionariesPage;
