// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components

export default function GuestLayout({children}) {
  return (
    <div>
      Guest
      {children}
    </div>
  );
}
GuestLayout.propTypes = {};
