// libs
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import cn from 'classnames';
//
import injectReducer from 'utils/injectReducer';
import {makeSelectIsLoginRoute, makeSelectLocation} from 'containers/App/selectors';
// components
import {Link} from 'react-router-dom';
import {Grid, Ref, Responsive} from 'semantic-ui-react';
import AuthForms from './components/AuthForms';
import reducer from './reducer';
// import saga from './saga';
import styles from './index.css';

export class HomePage extends React.PureComponent {
  static propTypes = {
    showLoginForm: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };
  state = {
    currentSlide: ['/register', '/login'].includes(this.props.location.pathname) ? 'auth' : 'video',
  };
  authRef = React.createRef();
  isMobile = false;

  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll);
  }

  componentDidUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll = (e) => {
    if (this.isMobile) {
      let {currentSlide} = this.state;
      if (e.deltaY < 0) {
        // scrolling up
        currentSlide = 'video';
      }
      if (e.deltaY > 0) {
        // scrolling down
        currentSlide = 'auth';
      }

      this.setState({currentSlide});
    }
  };

  handleTouchStart = (evt) => {
    this.yDown = evt.touches[0].clientY;
  };

  handleTouchMove = (evt) => {
    const {yDown} = this;
    if (!yDown) {
      return;
    }

    const yUp = evt.touches[0].clientY;

    const yDiff = yDown - yUp;
    let {currentSlide} = this.state;

    if (Math.abs(yDiff) > 0) {
      if (yDiff > 0) {
        currentSlide = 'auth';
      } else {
        currentSlide = 'video';
      }
      this.setState({currentSlide});
    }
    this.yDown = null;
  };

  handleAuthRef = (node) => {
    this.authContainerNode = node;
    // this.forceUpdate();
  };

  render() {
    const {currentSlide} = this.state;
    const {showLoginForm} = this.props;
    return (
      <div
        className={styles.container}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Responsive {...Responsive.onlyMobile}>{(this.isMobile = true)}</Responsive>
        <Grid>
          <Grid.Column
            className={cn(styles.slide, styles.video, {
              [styles.active]: currentSlide === 'video',
            })}
            floated="left"
            computer={11}
            mobile={16}
          >
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
            <Responsive {...Responsive.onlyMobile}>
              <Link to="/register">Register</Link>
            </Responsive>
          </Grid.Column>
          <Ref innerRef={this.handleAuthRef}>
            <Grid.Column
              className={cn(styles.slide, styles.auth, {
                [styles.active]: currentSlide === 'auth',
              })}
              floated="right"
              computer={5}
              mobile={16}
            >
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
