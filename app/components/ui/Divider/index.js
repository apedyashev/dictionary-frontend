// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {Divider as DividerSUI} from 'semantic-ui-react';

export default function Divider({children, className, horizontal}) {
  return (
    <DividerSUI horizontal={horizontal} className={className}>
      {children}
    </DividerSUI>
  );
}
Divider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  horizontal: PropTypes.bool,
};
