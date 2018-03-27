import React from 'react';
import {PropTypes} from 'prop-types';
import {Route} from 'react-router';

export default function RouteWithLayout({layout, component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return React.createElement(layout, props, React.createElement(component, props));
      }}
    />
  );
}
RouteWithLayout.propTypes = {
  layout: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
};
