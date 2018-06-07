import React from 'react';
import {PropTypes} from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Route} from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {RESTART_ON_REMOUNT} from 'utils/constants';
import {createStructuredSelector} from 'reselect';
import {ConnectedSwitch, PrivateRoute, GuestRoute} from 'utils/router';
import {GuestLayout, DashboardLayout} from 'containers/Layouts';
import {
  HomePage,
  DictionariesPage,
  LearnWordsPage,
  SchedulePage,
  SettingsPage,
  FacebookCallbackPage,
  NotFoundPage,
} from 'containers/screens';
import {PageLoader, Dimmable} from 'components/ui';
import Notification from 'containers/Notification';

import {loadProfileActions, setToken} from './actions';
import reducer from './reducer';
import learnWordsReducer from 'containers/screens/Dashboard/LearnWordsPage/reducer';
import sidebarReducer from 'containers/SidebarOpenerIcon/reducer';
import saga from './saga';
import {makeSelectProfileLoaded, makeSelectProfileData, makeSelectLoggingOut} from './selectors';

export class App extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object,
    isProfileLoaded: PropTypes.bool.isRequired,
    loggingOut: PropTypes.bool.isRequired,
    loadProfile: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.loadProfile();
  }

  // important: https://github.com/ReactTraining/react-router/issues/5072#issuecomment-310184271
  render() {
    const {isProfileLoaded, profile, loggingOut} = this.props;
    return (
      <div>
        <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>

        {isProfileLoaded ? (
          <Dimmable withLoader dimmed={loggingOut} loaderMessage="Logging out">
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
                <GuestRoute
                  path="/register"
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
                  path="/learn-words/:slug/scheduled/:scheduledDate"
                  layout={DashboardLayout}
                  component={LearnWordsPage}
                  authed={!!profile.id}
                />
                <PrivateRoute
                  exact
                  path="/learn-words/:slug"
                  layout={DashboardLayout}
                  component={LearnWordsPage}
                  authed={!!profile.id}
                />
                <PrivateRoute
                  exact
                  path="/schedule"
                  layout={DashboardLayout}
                  component={SchedulePage}
                  authed={!!profile.id}
                />
                <PrivateRoute
                  exact
                  path="/settings"
                  layout={DashboardLayout}
                  component={SettingsPage}
                  authed={!!profile.id}
                />
                <Route path="/facebook/callback" component={FacebookCallbackPage} />
                <Route path="" component={NotFoundPage} />
              </ConnectedSwitch>
            </React.StrictMode>
          </Dimmable>
        ) : (
          <PageLoader />
        )}
        <Notification />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadProfile: () => {
      const token = localStorage.getItem('authToken') || '';
      dispatch(setToken(token));
      dispatch(loadProfileActions.request());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: makeSelectProfileLoaded(),
  loggingOut: makeSelectLoggingOut(),
  profile: makeSelectProfileData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'app', reducer});
const withLearnWordsReducer = injectReducer({key: 'learnWords', reducer: learnWordsReducer});
const withSidebarReducer = injectReducer({key: 'sidebar', reducer: sidebarReducer});
const withSaga = injectSaga({key: 'app', saga, mode: RESTART_ON_REMOUNT});

export default compose(
  withReducer,
  withLearnWordsReducer,
  withSidebarReducer,
  withSaga,
  withConnect
)(App);
