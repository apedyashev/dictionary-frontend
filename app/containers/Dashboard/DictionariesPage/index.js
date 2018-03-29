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

export class DictionariesPage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return <div>Dictionary</div>;
  }
}

DictionariesPage.propTypes = {};

// export function mapDispatchToProps(dispatch) {
//   return {};
// }
//
// const mapStateToProps = createStructuredSelector({});
//
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// const withReducer = injectReducer({key: 'dictionaries', reducer});
// const withSaga = injectSaga({key: 'dictionaries', saga});
//
// export default compose(withReducer, withSaga, withConnect)(DashboardPage);
export default DictionariesPage;