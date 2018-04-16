// libs
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import _mapValues from 'lodash/mapValues';
import {createStructuredSelector} from 'reselect';
// selectors
import {makeSelectEntityProps} from 'containers/App/selectors';
// reducers
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/App/reducer';

export default (ComposedComponent, selectedProps = {}, ...rest) => {
  /* eslint-disable react/no-multi-comp, react/prefer-stateless-function */
  class InnerComponent extends React.Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  /* eslint-enable react/no-multi-comp, react/prefer-stateless-function */

  const selectorsMap = _mapValues(selectedProps, (propPath) => {
    return makeSelectEntityProps(propPath.split('.'), ...rest);
  });
  const mapStateToProps = createStructuredSelector(selectorsMap);

  const withConnect = connect(mapStateToProps, null);
  const withReducer = injectReducer({key: 'app', reducer});

  return compose(withReducer, withConnect)(InnerComponent);
};
// export default withEntityProps;
