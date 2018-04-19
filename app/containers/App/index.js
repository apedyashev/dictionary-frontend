import React from 'react';
import {PropTypes} from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Route} from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {DAEMON} from 'utils/constants';
import {createStructuredSelector} from 'reselect';

import {ConnectedSwitch, PrivateRoute, GuestRoute} from 'utils/router';
import {GuestLayout, DashboardLayout} from 'containers/Layouts';
import {
  HomePage,
  DictionariesPage,
  LearnWordsPage,
  FacebookCallbackPage,
  NotFoundPage,
} from 'containers/screens';
import {PageLoader} from 'components/ui';

import {loadProfileActions, setToken} from './actions';
import reducer from './reducer';
import learnWordsReducer from 'containers/screens/Dashboard/LearnWordsPage/reducer';
import saga from './saga';
import {makeSelectProfileLoaded, makeSelectProfileData} from './selectors';

export class App extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    isProfileLoaded: PropTypes.bool.isRequired,
    onLoadProfile: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.onLoadProfile();
  }

  // important: https://github.com/ReactTraining/react-router/issues/5072#issuecomment-310184271
  render() {
    const {isProfileLoaded, profile} = this.props;
    return (
      <div>
        <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>

        {isProfileLoaded ? (
          <React.StrictMode>
            <ConnectedSwitch>
              <GuestRoute
                path="/"
                layout={GuestLayout}
                component={HomePage}
                exact
                authed={!!profile.id}
              />
              <GuestRoute
                path="/login"
                layout={GuestLayout}
                component={HomePage}
                exact
                authed={!!profile.id}
              />
              <PrivateRoute
                exact
                path="/dictionaries"
                layout={DashboardLayout}
                component={DictionariesPage}
                authed={!!profile.id}
              />
              <PrivateRoute
                path="/dictionaries/:slug"
                layout={DashboardLayout}
                component={DictionariesPage}
                authed={!!profile.id}
              />
              <PrivateRoute
                exact
                path="/learn-words"
                layout={DashboardLayout}
                component={LearnWordsPage}
                authed={!!profile.id}
              />
              <Route path="/facebook/callback" component={FacebookCallbackPage} />
              <Route path="" component={NotFoundPage} />
            </ConnectedSwitch>
          </React.StrictMode>
        ) : (
          <PageLoader />
        )}
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onLoadProfile: () => {
      const token = localStorage.getItem('authToken') || '';
      dispatch(setToken(token));
      dispatch(loadProfileActions.request());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: makeSelectProfileLoaded(),
  profile: makeSelectProfileData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'app', reducer});
const withLearnWordsReducer = injectReducer({key: 'learnWords', reducer: learnWordsReducer});
const withSaga = injectSaga({key: 'app', saga, mode: DAEMON});

export default compose(withReducer, withLearnWordsReducer, withSaga, withConnect)(App);
