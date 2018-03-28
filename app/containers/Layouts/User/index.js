// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components

export default function UserLayout({children}) {
  return (
    <div>
      User
      {children}
    </div>
  );
}
UserLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
