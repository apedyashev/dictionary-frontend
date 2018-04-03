// libs
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };
  state = {error: null, errorInfo: null};

  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo});
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

// export default ErrorBoundary;

const withErrorBoundary = (ComposedComponent) => {
  /* eslint-disable react/no-multi-comp, react/prefer-stateless-function */
  return class InnerComponent extends React.Component {
    render() {
      return (
        <ErrorBoundary>
          <ComposedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  };
  /* eslint-enable react/no-multi-comp, react/prefer-stateless-function */
};
export default withErrorBoundary;
