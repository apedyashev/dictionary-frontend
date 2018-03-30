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

// import {Grid} from 'semantic-ui-react';
// import {Paper} from 'components/ui';
// import Form from './components/Form';
// import messages from './messages';
// import {loadRepos} from '../App/actions';
// import {changeUsername} from './actions';
// import {makeSelectUsername} from './selectors';
// import reducer from './reducer';
// import saga from './saga';

import {Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react';
import Prompt from 'components/ui/Prompt';
import {Topbar, DictionariesList} from './components';

export class WordsPage extends React.PureComponent {
  static propTypes = {};
  state = {showDictionaries: true};

  componentDidMount() {}

  handleShowDictsToggle = () => {
    this.setState({showDictionaries: !this.state.showDictionaries});
  };
  render() {
    const {showDictionaries} = this.state;
    return (
      <div>
        <Topbar onShowDictsToggle={this.handleShowDictsToggle} />
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="push" width="wide" visible={showDictionaries} vertical>
            <DictionariesList />
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

export function mapDispatchToProps(dispatch) {
  return {
    loadWords: () => {
      const token = localStorage.getItem('authToken') || '';
      dispatch(setToken(token));
      dispatch(loadProfileActions.request());
    },
  };
}

const mapStateToProps = createStructuredSelector({});
//
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// const withReducer = injectReducer({key: 'dictionaries', reducer});
// const withSaga = injectSaga({key: 'dictionaries', saga});
//
// export default compose(withReducer, withSaga, withConnect)(DashboardPage);
export default WordsPage;
