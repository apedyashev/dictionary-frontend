import React from 'react';
import {PropTypes} from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

export default function GuestRoute({layout: Layout, component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authed) {
          /* eslint-disable react/prop-types */
          return <Redirect to={{pathname: '/dictionaries', state: {from: props.location}}} />;
          /* eslint-enable react/prop-types */
        }
        if (Layout) {
          return React.createElement(Layout, props, React.createElement(Component, props));
        }
        return <Component {...props} />;
      }}
    />
  );
}

GuestRoute.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  authed: PropTypes.bool,
};
