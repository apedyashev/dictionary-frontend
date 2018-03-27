import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {DAEMON} from 'utils/constants';
import {createStructuredSelector} from 'reselect';

import {ConnectedSwitch} from 'utils/router';
import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Navheader from 'components/ui/Navheader';
import Navheader from 'components/ui/Navbar';
import Footer from 'components/Footer';

import {loadProfileActions} from './actions';
import reducer from './reducer';
import saga from './saga';
import {makeSelectProfileLoading, makeSelectProfileData} from './selectors';

export class App extends React.PureComponent {
  componentDidMount() {
    this.props.onLoadProfile();
  }

  // important: https://github.com/ReactTraining/react-router/issues/5072#issuecomment-310184271
  render() {
    const {isProfileLoading, profile} = this.props;
    console.log('isProfileLoading', profile.id);
    return (
      <div>
        <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Navheader />
        <ConnectedSwitch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute path="/features" authed={!!profile.id} component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </ConnectedSwitch>
        <Footer />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onLoadProfile: () => {
      dispatch(loadProfileActions.request());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isProfileLoading: makeSelectProfileLoading(),
  profile: makeSelectProfileData(),
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'app', reducer});
const withSaga = injectSaga({key: 'app', saga, mode: DAEMON});

export default compose(withReducer, withSaga, withConnect)(App);
