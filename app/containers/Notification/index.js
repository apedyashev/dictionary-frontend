// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// actions
import {resetNotification} from './actions';
// selectors
import {makeSelectNotification} from './selectors';
// components
import {Snackbar} from 'components/ui';
// other
import injectReducer from 'utils/injectReducer';

class Notification extends React.PureComponent {
  static propTypes = {};

  handleSnackbarHide = () => {
    this.props.resetNotification();
  };

  render() {
    const {notification} = this.props;
    return (
      <Snackbar
        message={notification.get('message')}
        level={notification.get('level')}
        onHide={this.handleSnackbarHide}
      />
    );
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    notification: makeSelectNotification(),
  });

export default connect(mapStateToProps, {resetNotification})(Notification);
