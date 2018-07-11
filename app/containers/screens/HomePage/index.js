// libs
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import cn from 'classnames';
import {push} from 'react-router-redux';
import injectReducer from 'utils/injectReducer';
import {makeSelectIsLoginRoute, makeSelectLocation} from 'containers/App/selectors';
import {FormattedMessage} from 'react-intl';
// components
import {Link} from 'react-router-dom';
import {Grid, Responsive} from 'semantic-ui-react';
import {Button} from 'components/ui';
import AuthForms from './components/AuthForms';
import reducer from './reducer';
// other
import messages from './messages';
import styles from './index.css';

export class HomePage extends React.PureComponent {
  static propTypes = {
    showLoginForm: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  };
  state = {
    currentSlide: ['/register', '/login'].includes(this.props.location.pathname) ? 'auth' : 'video',
  };
  isMobile = false;

  static getDerivedStateFromProps(props, state) {
    if (props.location.pathname !== state.lastPathname) {
      return {
        currentSlide: ['/register', '/login'].includes(props.location.pathname) ? 'auth' : 'video',
        lastPathname: props.location.pathname,
      };
    }

    return null;
  }

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

      // this.setState({currentSlide});
      this.changeSlide(currentSlide);
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
      this.changeSlide(currentSlide);
      // this.setState({currentSlide});
    }
    this.yDown = null;
  };

  changeSlide = (currentSlide) => {
    this.setState({currentSlide});
    if (currentSlide === 'auth') {
      this.props.push('/register');
    } else if (currentSlide === 'video') {
      this.props.push('/');
    }
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
              <h3 className={styles.centered}>
                <FormattedMessage {...messages.introHeader} />
              </h3>
              <FormattedMessage {...messages.introDescription} />
            </p>
            <div className={styles.videoContainer}>video</div>

            <p>
              <FormattedMessage {...messages.techniqueDescription} />
            </p>
            <Responsive {...Responsive.onlyMobile}>
              <div className={styles.centered}>
                <Button as={Link} to="/register">
                  Join Now
                </Button>
              </div>
            </Responsive>
          </Grid.Column>
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showLoginForm: makeSelectIsLoginRoute(),
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  {push}
);
const withReducer = injectReducer({key: 'home', reducer});

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(HomePage);
