// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
// other
import styles from './index.css';

class Snackbar extends React.PureComponent {
  static propTypes = {};
  state = {message: null};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message !== prevState.prevMessage) {
      return {
        message: nextProps.message,
        prevMessage: nextProps.message,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.message && !!this.state.message) {
      setTimeout(() => {
        this.props.onHide();
        this.setState({message: null});
      }, 3000);
    }
  }

  render() {
    const {message} = this.state;
    return <div className={cn(styles.root, {[styles.show]: !!message})}>{message}</div>;
  }
}

export default Snackbar;
