import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function PrivateRoute({layout: Layout, component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authed) {
          if (Layout) {
            return React.createElement(Layout, props, React.createElement(Component, props));
          } else {
            return <Component {...props} />;
          }
        } else {
          return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
        }
      }}
    />
  );
}
