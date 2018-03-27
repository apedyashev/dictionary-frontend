import React from 'react';
import {PropTypes} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

export default function PrivateRoute({layout: Layout, component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authed) {
          if (Layout) {
            return React.createElement(Layout, props, React.createElement(Component, props));
          }
          return <Component {...props} />;
        }
        /* eslint-disable react/prop-types */
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
        /* eslint-enable react/prop-types */
      }}
    />
  );
}

PrivateRoute.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  authed: PropTypes.bool,
};
