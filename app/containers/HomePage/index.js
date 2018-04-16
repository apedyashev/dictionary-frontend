// libs
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
//
import injectReducer from 'utils/injectReducer';
import {makeSelectIsLoginRoute} from 'containers/App/selectors';
// components
import {Grid} from 'semantic-ui-react';
import AuthForms from './components/AuthForms';
import reducer from './reducer';
// import saga from './saga';
import styles from './index.css';

export class HomePage extends React.PureComponent {
  static propTypes = {
    showLoginForm: PropTypes.bool.isRequired,
  };

  render() {
    const {showLoginForm} = this.props;

    return (
      <div className={styles.container}>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Grid>
          <Grid.Column floated="left" width={11}>
            text left
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            <AuthForms showLoginForm={showLoginForm} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  showLoginForm: makeSelectIsLoginRoute(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'home', reducer});

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(HomePage);
