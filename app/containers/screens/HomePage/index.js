// libs
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
//
import injectReducer from 'utils/injectReducer';
import {makeSelectIsLoginRoute, makeSelectLocation} from 'containers/App/selectors';
// components
import {Link} from 'react-router-dom';
import {Grid, Ref} from 'semantic-ui-react';
import AuthForms from './components/AuthForms';
import reducer from './reducer';
// import saga from './saga';
import styles from './index.css';

export class HomePage extends React.PureComponent {
  static propTypes = {
    showLoginForm: PropTypes.bool.isRequired,
  };
  authRef = React.createRef();

  componentDidUpdate(prevProps) {
    console.log('====', this.props.location.pathname);
    if (['/register', '/login'].includes(this.props.location.pathname)) {
      window.scrollTo(0, this.authContainerNode.offsetTop);
    }
  }

  handleAuthRef = (node) => {
    this.authContainerNode = node;
    this.forceUpdate();
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
          <Grid.Column className={styles.slide} floated="left" computer={11} mobile={16}>
            <p>
              <h3>Change the way you learn words!</h3>
              Learn them in the most efficient way with spaced repetition technique!
            </p>
            <div className={styles.videoContainer}>video</div>

            <p>
              Spaced repetition is a learning technique that incorporates increasing intervals of
              time between subsequent review of previously learned material in order to exploit the
              psychological spacing effect.
            </p>
            <Link to="/register">Register</Link>
          </Grid.Column>
          <Ref innerRef={this.handleAuthRef}>
            <Grid.Column className={styles.slide} floated="right" computer={5} mobile={16}>
              <AuthForms showLoginForm={showLoginForm} />
            </Grid.Column>
          </Ref>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showLoginForm: makeSelectIsLoginRoute(),
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, null);
const withReducer = injectReducer({key: 'home', reducer});

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(HomePage);
